export interface Review{
_id?: string;
productId: string;   // ID of the reviewed product
usderId: string;     // ID of the user who wrote the review
rating: number;      // 1-5 on the ratings for a 1-5 Stars?
comment: string;
dateCreated?: Date;
dateUpdated?: Date;
}