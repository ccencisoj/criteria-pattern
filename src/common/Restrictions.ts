import { Criterion } from "./Criterion";
import { Conjuntion } from "./Conjuntion";
import { Disjuntion } from "./Disjunction";

export class Restrictions {
  public static conjunction(conjunction: Conjuntion): Criterion {
    return new Criterion("conjunction", "", conjunction);
  }

  public static disjunction(disjunction: Disjuntion): Criterion {
    return new Criterion("disjunction", "", disjunction);
  }

  public static equal(column: string, value: string): Criterion {
    return new Criterion("equal", column, value);
  }

  public static noEqual(column: string, value: string): Criterion {
    return new Criterion("noEqual", column, value);
  }

  public static like(column: string, value: string): Criterion {
    return new Criterion("like", column, value);
  }

  public static noLike(column: string, value: string): Criterion {
    return new Criterion("noLike", column, value);
  }

  public static between(column: string, start: number, end: number): Criterion {
    return new Criterion("between", column, {start, end});
  }
}
