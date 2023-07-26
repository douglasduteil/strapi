import { Database } from '../..';
import * as errors from '../../errors';
import Dialect from '../dialect';
import PostgresqlSchemaInspector from './schema-inspector';

export default class PostgresDialect extends Dialect {
  schemaInspector: PostgresqlSchemaInspector;

  constructor(db: Database) {
    super(db, 'postgres');

    this.schemaInspector = new PostgresqlSchemaInspector(db);
  }

  useReturning() {
    return true;
  }

  async initialize() {
    // Don't cast DATE string to Date()
    this.db.connection.client.driver.types.setTypeParser(
      this.db.connection.client.driver.types.builtins.DATE,
      'text',
      (v: unknown) => v
    );
    this.db.connection.client.driver.types.setTypeParser(
      this.db.connection.client.driver.types.builtins.NUMERIC,
      'text',
      parseFloat
    );
  }

  usesForeignKeys() {
    return true;
  }

  getSqlType(type: string) {
    switch (type) {
      case 'timestamp': {
        return 'datetime';
      }
      default: {
        return type;
      }
    }
  }

  transformErrors(error: NodeJS.ErrnoException) {
    switch (error.code) {
      case '23502': {
        throw new errors.NotNullError({
          column: 'column' in error ? `${error.column}` : undefined,
        });
      }
      default: {
        super.transformErrors(error);
      }
    }
  }
}
