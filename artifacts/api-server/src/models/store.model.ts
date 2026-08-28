import {
  model,
  models,
  Schema,
  type HydratedDocument,
  type Types,
} from "mongoose";

export const STORE_STATUSES = ["active", "inactive"] as const;

export type StoreStatus = (typeof STORE_STATUSES)[number];

export interface IStore {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  vendor: Types.ObjectId;
  status: StoreStatus;
}

export type StoreDocument = HydratedDocument<IStore>;

const storeSchema = new Schema<IStore>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      maxlength: 140,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2_000,
    },
    logoUrl: {
      type: String,
      trim: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: STORE_STATUSES,
      default: "active",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

storeSchema.index({ slug: 1 }, { unique: true });
storeSchema.index({ vendor: 1, status: 1 });

export const Store =
  models.Store ?? model<IStore>("Store", storeSchema);