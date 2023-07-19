export interface Schema {
  tables: Table[];
}

export interface Table {
  name: string;
  columns: Column[];
  indexes: Index[];
  foreignKeys: ForeignKey[];
}

export interface Column {
  type: string;
  name: string;
  args?: unknown[];
  defaultTo?: unknown;
  notNullable: boolean | null;
  unsigned?: boolean;
  unique?: boolean;
  primary?: boolean;
}

export interface Index {
  columns: string[];
  name: string;
  type: 'primary' | 'unique' | null;
}

export interface ForeignKey {
  name?: string;
  columns: string[];
  referencedColumns: string[];
  referencedTable: string | null;
  onUpdate: string | null;
  onDelete: string | null;
}
