export class Criterion {
  private type: string;
  private column: string;
  private value: any;

  constructor(type: string, column: string, value: any) {
    this.type = type;
    this.column = column;
    this.value = value;
  }

  public toSQL(): string {
    switch(this.type) {
      case "equal": 
        return `${this.column} = '${this.value}'`;
      case "noEqual": 
        return `${this.column} != '${this.value}'`;
      case "like": 
        return `${this.column} LIKE '%${this.value}%'`;
      case "noLike": 
        return `${this.column} NOT LIKE '%${this.value}%'`;
      case "between": 
        return `${this.column} >= '${this.value} AND ${this.column} <= ${this.value}'`;
    }
  }

  public toMongo(): any {
    switch(this.type) {
      case "equal": 
        return {[this.column]: {$eq: this.value}};
      case "noEqual": 
        return {[this.column]: {$neq: this.value}};
      case "like": 
        return {[this.column]: {$regex: `.*this.value.*`}};
      case "noLike": 
        return {[this.column]: {$ne: {$regex: this.value}}};
      case "between": 
        return {[this.column]: {$gt: this.value.start, $lt: this.value.end}};
    }
  }
}
