import { z } from 'zod';

export const applicationTypeSchema = z.enum(['widget', 'screen', 'service']);
export type SharedApplicationType = z.infer<typeof applicationTypeSchema>;

export const applicationStatusSchema = z.enum(['draft', 'pending', 'published', 'rejected']);
export type SharedApplicationStatus = z.infer<typeof applicationStatusSchema>;

export const applicationEntryPointsSchema = z
  .object({
    frontend: z.string().optional(),
    backend: z.string().optional(),
  })
  .partial();
export type SharedApplicationEntryPoints = z.infer<typeof applicationEntryPointsSchema>;

export const applicationStorageMetaSchema = z
  .object({
    rootDir: z.string().optional(),
    archivePath: z.string().optional(),
    contentPath: z.string().optional(),
    manifestPath: z.string().optional(),
  })
  .partial();
export type SharedApplicationStorageMeta = z.infer<typeof applicationStorageMetaSchema>;

export const applicationVersionHistorySchema = z.object({
  version: z.string(),
  status: applicationStatusSchema,
  releaseNotes: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  entryPoints: applicationEntryPointsSchema.nullable().optional(),
  permissions: z.array(z.string()).default([]),
  storage: applicationStorageMetaSchema.nullable().optional(),
  manifest: z.unknown().nullable().optional(),
});
export type SharedApplicationVersionHistoryDTO = z.infer<typeof applicationVersionHistorySchema>;

export const applicationSummarySchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  version: z.string(),
  type: applicationTypeSchema,
  description: z.string().optional(),
  status: applicationStatusSchema,
  isPublished: z.boolean(),
  owner: z.string().optional(),
  entryPoints: applicationEntryPointsSchema.optional().nullable(),
  permissions: z.array(z.string()).default([]),
  storage: applicationStorageMetaSchema.optional().nullable(),
  icon: z.string().optional().nullable(),
});

export const applicationDetailsSchema = applicationSummarySchema.extend({
  versionHistory: z.array(applicationVersionHistorySchema).optional(),
});

export type SharedApplicationDTO = z.infer<typeof applicationSummarySchema>;
export type SharedApplicationDetailsDTO = z.infer<typeof applicationDetailsSchema>;
