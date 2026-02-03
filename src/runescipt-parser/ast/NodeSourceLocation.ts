export class NodeSourceLocation {
  public readonly name: string;
  public readonly line: number;
  public readonly column: number;

  constructor(name: string, line: number, column: number) {
    this.name = name;
    this.line = line;
    this.column = column;
  }
}
