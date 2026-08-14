import {
  model,
  models,
  Schema,
  type HydratedDocument,
  type Types,
} from "mongoose";

export const PRODUCT_STATUSES = ["draft", "active", "archived"] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export interface IProduct {
  name: string;
  slug: string;
  description?: string;
  sku: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  status: ProductStatus;
  store: Types.ObjectId;
  vendor: Types.ObjectId;
}

export type ProductDocument = HydratedDocument<IProduct>;

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      maxlength: 220,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5_000,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 100,
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: PRODUCT_STATUSES,
      default: "draft",
      required: true,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ store: 1, slug: 1 }, { unique: true });
productSchema.index({ store: 1, status: 1 });
productSchema.index({ vendor: 1, sku: 1 }, { unique: true });

export const Product =
  models.Product ?? model<IProduct>("Product", productSchema);