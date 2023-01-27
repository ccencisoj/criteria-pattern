import { Criterion } from "./Criterion";

export class Criteria {
  private page: number;
  private limit: number;
  private criterions: Criterion[];

  public add(criterion: Criterion): void {
    this.criterions.push(criterion);
  }

  public getPage(): number {
    return this.page || 0;
  }

  public getLimit(): number {
    return this.limit || 50;
  }

  public setPage(page: number): void {
    this.page = page;
  }

  public setLimit(limit: number): void {
    this.limit = limit;
  }

  public toSQL = (): string => {
    return `${this.criterions.map((criterion)=> criterion.toSQL()).join(" AND ")} LIMIT ${this.limit}`;
  }

  public toMongo = (): any => {
    return {$and: this.criterions.map((criterion)=> criterion.toMongo())};
  }
}
