export interface ColumnInfo {
  unsigned?: boolean;
  defaultTo?: unknown;
}

export interface Attribute {
  type: string;
  columnName?: string;
  column?: ColumnInfo;
  required?: boolean;
  unique?: boolean;
  component?: string;
  repeatable?: boolean;
  relation?: string;
}

export interface JoinTable {
  name: string;
  joinColumn: {
    name: string;
    referencedColumn: string;
  };
  orderBy?: Record<string, 'asc' | 'desc'>;
  orderColumnName?: string;
  inverseOrderColumnName?: string;
  pivotColumns: string[];
}

export interface AttributeJoinTable extends JoinTable {
  inverseJoinColumn: {
    name: string;
    referencedColumn: string;
  };
}

export interface MorphJoinTable extends JoinTable {
  morphColumn: {
    typeColumn: {
      name: string;
    };
    idColumn: {
      name: string;
      referencedColumn: string;
    };
  };
  inverseJoinColumn?: never;
}

export interface BidirectionalRelationalAttribute extends RelationalAttribute {
  inversedBy: string;
}

export interface RelationalAttribute extends Attribute {
  relation: string;
  target: string;
  useJoinTable?: boolean;
  joinTable?: AttributeJoinTable | MorphJoinTable;
  morphBy?: string;
  inversedBy?: string;
}

export interface Meta {
  singularName?: string;
  uid: string;
  tableName: string;
  attributes: Record<string, Attribute>;
  indexes: Record<string, unknown>[];
  foreignKeys?: Record<string, unknown>[];
  lifecycles?: Record<string, unknown>;
  columnToAttribute?: Record<string, string>;
  componentLink?: Meta;
}

export interface ComponentLinkMeta extends Meta {
  componentLink: Meta;
}

export interface Model {
  uid: string;
  tableName: string;
  singularName: string;
  attributes: Record<string, Attribute>;
  lifecycles: Record<string, unknown>;
  indexes: Record<string, unknown>[];
  componentLink?: Meta;
  columnToAttribute?: Record<string, string>;
  foreignKeys?: Record<string, unknown>[];
}

export class Metadata extends Map<string, Meta> {
  add(meta: Meta) {
    return this.set(meta.uid, meta);
  }

  /**
   * Validate the DB metadata, throwing an error if a duplicate DB table name is detected
   */
  validate() {
    const seenTables = new Map();
    for (const meta of this.values()) {
      if (seenTables.get(meta.tableName)) {
        throw new Error(
          `DB table "${meta.tableName}" already exists. Change the collectionName of the related content type.`
        );
      }
      seenTables.set(meta.tableName, true);
    }
  }
}
