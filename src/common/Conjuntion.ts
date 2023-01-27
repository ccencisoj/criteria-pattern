import { Criterion } from "./Criterion";

export class Conjuntion {
  private criterions: Criterion[] = [];

  public add(criterion: Criterion): void {
    this.criterions.push(criterion);
  }

  public toSQL(): string {
    return this.criterions.map((criterion)=> criterion.toSQL()).join(" OR ");
  }

  public toMongo(): any {
    return {$or: this.criterions.map((criterion)=> criterion.toMongo())};
  }
}
