export class BaseEntity {
  public id: string;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt?: string;
  public isDeleted: boolean;
  
  public setId = (id: string)=> {
    this.id = id;
  }

  public setCreatedAt = (createdAt: string)=> {
    this.createdAt = createdAt;
  }

  public setUpdatedAt = (updatedAt: string)=> {
    this.updatedAt = updatedAt;
  }

  public setDeletedAt = (deletedAt: string)=> {
    this.deletedAt = deletedAt;
  }

  public setIsDeleted = (isDeleted: boolean)=> {
    this.isDeleted = isDeleted;
  }
}
