import { Criterion } from "./Criterion";

export class Disjuntion {
  private criterions: Criterion[] = [];

  public add(criterion: Criterion): void {
    this.criterions.push(criterion);
  }

  public toSQL(): string {
    return "(" + this.criterions.map((criterion)=> criterion.toSQL()).join(" AND ") + ")";
  }

  public toMongo(): any {
    return {$and: this.criterions.map((criterion)=> criterion.toMongo())};
  }
}
