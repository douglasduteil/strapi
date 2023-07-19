import type { Database } from '..';

export default class Dialect {
  db: Database;

  client: string;

  constructor(db: Database, client: string) {
    this.db = db;
    this.client = client;
  }

  configure() {}

  initialize() {}

  getSqlType(type: unknown) {
    return type;
  }

  canAlterConstraints() {
    return true;
  }

  usesForeignKeys() {
    return false;
  }

  useReturning() {
    return false;
  }

  supportsUnsigned() {
    return false;
  }

  supportsWindowFunctions() {
    return true;
  }

  supportsOperator() {
    return true;
  }

  async startSchemaUpdate() {
    // noop
  }

  async endSchemaUpdate() {
    // noop
  }

  transformErrors(error: unknown) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(error.message);
  }

  canAddIncrements() {
    return true;
  }
}
