/**
 * Prisma Zod Generator - Single File (inlined)
 * Auto-generated. Do not edit.
 */

import type { Prisma } from '@prisma/client';
import * as z from 'zod';
// JSON helper schemas (hoisted)
const jsonSchema = (() => {
  const JsonValueSchema: any = (() => {
    const recur: any = z.lazy(() =>
      z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.literal(null),
        z.record(
          z.string(),
          z.lazy(() => recur.optional())
        ),
        z.array(z.lazy(() => recur)),
      ])
    );
    return recur;
  })();
  return JsonValueSchema;
})();
// File: UserScalarFieldEnum.schema.ts

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'email',
  'password',
  'name',
  'resetPasswordToken',
  'resetPasswordExpires',
  'createdAt',
  'updatedAt',
]);

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;

// File: ApplicationScalarFieldEnum.schema.ts

export const ApplicationScalarFieldEnumSchema = z.enum([
  'id',
  'key',
  'name',
  'version',
  'type',
  'description',
  'status',
  'isPublished',
  'ownerId',
  'permissions',
  'manifest',
  'icon',
  'createdAt',
  'updatedAt',
]);

export type ApplicationScalarFieldEnum = z.infer<typeof ApplicationScalarFieldEnumSchema>;

// File: ApplicationVersionScalarFieldEnum.schema.ts

export const ApplicationVersionScalarFieldEnumSchema = z.enum([
  'id',
  'applicationId',
  'version',
  'status',
  'releaseNotes',
  'description',
  'createdAt',
  'permissions',
  'manifest',
]);

export type ApplicationVersionScalarFieldEnum = z.infer<
  typeof ApplicationVersionScalarFieldEnumSchema
>;

// File: UserApplicationScalarFieldEnum.schema.ts

export const UserApplicationScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'applicationId',
  'createdAt',
  'updatedAt',
]);

export type UserApplicationScalarFieldEnum = z.infer<typeof UserApplicationScalarFieldEnumSchema>;

// File: ApiKeyScalarFieldEnum.schema.ts

export const ApiKeyScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'provider',
  'encryptedKey',
  'createdAt',
  'updatedAt',
]);

export type ApiKeyScalarFieldEnum = z.infer<typeof ApiKeyScalarFieldEnumSchema>;

// File: SettingsScalarFieldEnum.schema.ts

export const SettingsScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'volume',
  'language',
  'theme',
  'accentColorLight',
  'accentColorDark',
  'sttProviderName',
  'llmProviderName',
  'llmModel',
  'ttsProviderName',
  'welcomeTitle',
  'idleTimeoutSeconds',
  'idleMode',
  'idleCustomImagePath',
  'idleRemoteEndpoint',
  'createdAt',
  'updatedAt',
]);

export type SettingsScalarFieldEnum = z.infer<typeof SettingsScalarFieldEnumSchema>;

// File: DialogScalarFieldEnum.schema.ts

export const DialogScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'dialogId',
  'title',
  'createdAt',
  'updatedAt',
]);

export type DialogScalarFieldEnum = z.infer<typeof DialogScalarFieldEnumSchema>;

// File: SortOrder.schema.ts

export const SortOrderSchema = z.enum(['asc', 'desc']);

export type SortOrder = z.infer<typeof SortOrderSchema>;

// File: QueryMode.schema.ts

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export type QueryMode = z.infer<typeof QueryModeSchema>;

// File: ApplicationType.schema.ts

export const ApplicationTypeSchema = z.enum(['widget', 'screen', 'service']);

export type ApplicationType = z.infer<typeof ApplicationTypeSchema>;

// File: ApplicationStatus.schema.ts

export const ApplicationStatusSchema = z.enum(['draft', 'pending', 'published', 'rejected']);

export type ApplicationStatus = z.infer<typeof ApplicationStatusSchema>;

// File: Language.schema.ts

export const LanguageSchema = z.enum(['ru', 'en', 'zh']);

export type Language = z.infer<typeof LanguageSchema>;

// File: Theme.schema.ts

export const ThemeSchema = z.enum(['light', 'dark', 'system']);

export type Theme = z.infer<typeof ThemeSchema>;

// File: IdleMode.schema.ts

export const IdleModeSchema = z.enum(['api', 'custom']);

export type IdleMode = z.infer<typeof IdleModeSchema>;

// File: MessagePosition.schema.ts

export const MessagePositionSchema = z.enum(['left', 'right']);

export type MessagePosition = z.infer<typeof MessagePositionSchema>;

// File: ReleaseType.schema.ts

export const ReleaseTypeSchema = z.enum(['patch', 'minor', 'major']);

export type ReleaseType = z.infer<typeof ReleaseTypeSchema>;

// File: UserWhereInput.schema.ts

const userwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    password: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    oauthProviders: z
      .union([
        z.lazy(() => OAuthProviderCompositeListFilterObjectSchema),
        z.lazy(() => OAuthProviderObjectEqualityInputObjectSchema).array(),
      ])
      .optional(),
    resetPasswordToken: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    resetPasswordExpires: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    applications: z.lazy(() => ApplicationListRelationFilterObjectSchema).optional(),
    installs: z.lazy(() => UserApplicationListRelationFilterObjectSchema).optional(),
    apiKeys: z.lazy(() => ApiKeyListRelationFilterObjectSchema).optional(),
    settings: z
      .union([
        z.lazy(() => SettingsNullableScalarRelationFilterObjectSchema),
        z.lazy(() => SettingsWhereInputObjectSchema),
      ])
      .optional(),
    dialogs: z.lazy(() => DialogListRelationFilterObjectSchema).optional(),
  })
  .strict();
export const UserWhereInputObjectSchema: z.ZodType<Prisma.UserWhereInput> =
  userwhereinputSchema as unknown as z.ZodType<Prisma.UserWhereInput>;
export const UserWhereInputObjectZodSchema = userwhereinputSchema;

// File: UserOrderByWithRelationInput.schema.ts
const __makeSchema_UserOrderByWithRelationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      password: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      oauthProviders: z
        .lazy(() => OAuthProviderOrderByCompositeAggregateInputObjectSchema)
        .optional(),
      resetPasswordToken: SortOrderSchema.optional(),
      resetPasswordExpires: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      applications: z.lazy(() => ApplicationOrderByRelationAggregateInputObjectSchema).optional(),
      installs: z.lazy(() => UserApplicationOrderByRelationAggregateInputObjectSchema).optional(),
      apiKeys: z.lazy(() => ApiKeyOrderByRelationAggregateInputObjectSchema).optional(),
      settings: z.lazy(() => SettingsOrderByWithRelationInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogOrderByRelationAggregateInputObjectSchema).optional(),
    })
    .strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  __makeSchema_UserOrderByWithRelationInput_schema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema =
  __makeSchema_UserOrderByWithRelationInput_schema();

// File: UserWhereUniqueInput.schema.ts
const __makeSchema_UserWhereUniqueInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      email: z.string().optional(),
    })
    .strict();
export const UserWhereUniqueInputObjectSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  __makeSchema_UserWhereUniqueInput_schema() as unknown as z.ZodType<Prisma.UserWhereUniqueInput>;
export const UserWhereUniqueInputObjectZodSchema = __makeSchema_UserWhereUniqueInput_schema();

// File: UserOrderByWithAggregationInput.schema.ts
const __makeSchema_UserOrderByWithAggregationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      password: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      resetPasswordToken: SortOrderSchema.optional(),
      resetPasswordExpires: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputObjectSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputObjectSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();
export const UserOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  __makeSchema_UserOrderByWithAggregationInput_schema() as unknown as z.ZodType<Prisma.UserOrderByWithAggregationInput>;
export const UserOrderByWithAggregationInputObjectZodSchema =
  __makeSchema_UserOrderByWithAggregationInput_schema();

// File: UserScalarWhereWithAggregatesInput.schema.ts

const userscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    email: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    password: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    resetPasswordToken: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    resetPasswordExpires: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
  })
  .strict();
export const UserScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  userscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UserScalarWhereWithAggregatesInput>;
export const UserScalarWhereWithAggregatesInputObjectZodSchema =
  userscalarwherewithaggregatesinputSchema;

// File: ApplicationWhereInput.schema.ts

const applicationwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ApplicationWhereInputObjectSchema),
        z.lazy(() => ApplicationWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ApplicationWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ApplicationWhereInputObjectSchema),
        z.lazy(() => ApplicationWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    key: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    version: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    type: z
      .union([z.lazy(() => EnumApplicationTypeFilterObjectSchema), ApplicationTypeSchema])
      .optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    status: z
      .union([z.lazy(() => EnumApplicationStatusFilterObjectSchema), ApplicationStatusSchema])
      .optional(),
    isPublished: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
    ownerId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(24)])
      .optional()
      .nullable(),
    entryPoints: z
      .union([
        z.lazy(() => ApplicationEntryPointsNullableCompositeFilterObjectSchema),
        z.lazy(() => ApplicationEntryPointsObjectEqualityInputObjectSchema),
      ])
      .optional()
      .nullable(),
    permissions: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    storage: z
      .union([
        z.lazy(() => ApplicationStorageMetaNullableCompositeFilterObjectSchema),
        z.lazy(() => ApplicationStorageMetaObjectEqualityInputObjectSchema),
      ])
      .optional()
      .nullable(),
    manifest: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    icon: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    owner: z
      .union([
        z.lazy(() => UserNullableScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    versions: z.lazy(() => ApplicationVersionListRelationFilterObjectSchema).optional(),
    userInstalls: z.lazy(() => UserApplicationListRelationFilterObjectSchema).optional(),
  })
  .strict();
export const ApplicationWhereInputObjectSchema: z.ZodType<Prisma.ApplicationWhereInput> =
  applicationwhereinputSchema as unknown as z.ZodType<Prisma.ApplicationWhereInput>;
export const ApplicationWhereInputObjectZodSchema = applicationwhereinputSchema;

// File: ApplicationOrderByWithRelationInput.schema.ts
const __makeSchema_ApplicationOrderByWithRelationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      key: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      version: SortOrderSchema.optional(),
      type: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      isPublished: SortOrderSchema.optional(),
      ownerId: SortOrderSchema.optional(),
      entryPoints: z.lazy(() => ApplicationEntryPointsOrderByInputObjectSchema).optional(),
      permissions: SortOrderSchema.optional(),
      storage: z.lazy(() => ApplicationStorageMetaOrderByInputObjectSchema).optional(),
      manifest: SortOrderSchema.optional(),
      icon: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      owner: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
      versions: z
        .lazy(() => ApplicationVersionOrderByRelationAggregateInputObjectSchema)
        .optional(),
      userInstalls: z
        .lazy(() => UserApplicationOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ApplicationOrderByWithRelationInput> =
  __makeSchema_ApplicationOrderByWithRelationInput_schema() as unknown as z.ZodType<Prisma.ApplicationOrderByWithRelationInput>;
export const ApplicationOrderByWithRelationInputObjectZodSchema =
  __makeSchema_ApplicationOrderByWithRelationInput_schema();

// File: ApplicationWhereUniqueInput.schema.ts
const __makeSchema_ApplicationWhereUniqueInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      key: z.string().optional(),
    })
    .strict();
export const ApplicationWhereUniqueInputObjectSchema: z.ZodType<Prisma.ApplicationWhereUniqueInput> =
  __makeSchema_ApplicationWhereUniqueInput_schema() as unknown as z.ZodType<Prisma.ApplicationWhereUniqueInput>;
export const ApplicationWhereUniqueInputObjectZodSchema =
  __makeSchema_ApplicationWhereUniqueInput_schema();

// File: ApplicationOrderByWithAggregationInput.schema.ts
const __makeSchema_ApplicationOrderByWithAggregationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      key: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      version: SortOrderSchema.optional(),
      type: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      isPublished: SortOrderSchema.optional(),
      ownerId: SortOrderSchema.optional(),
      permissions: SortOrderSchema.optional(),
      manifest: SortOrderSchema.optional(),
      icon: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z.lazy(() => ApplicationCountOrderByAggregateInputObjectSchema).optional(),
      _max: z.lazy(() => ApplicationMaxOrderByAggregateInputObjectSchema).optional(),
      _min: z.lazy(() => ApplicationMinOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ApplicationOrderByWithAggregationInput> =
  __makeSchema_ApplicationOrderByWithAggregationInput_schema() as unknown as z.ZodType<Prisma.ApplicationOrderByWithAggregationInput>;
export const ApplicationOrderByWithAggregationInputObjectZodSchema =
  __makeSchema_ApplicationOrderByWithAggregationInput_schema();

// File: ApplicationScalarWhereWithAggregatesInput.schema.ts

const applicationscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ApplicationScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => ApplicationScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ApplicationScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ApplicationScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => ApplicationScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    key: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    version: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    type: z
      .union([
        z.lazy(() => EnumApplicationTypeWithAggregatesFilterObjectSchema),
        ApplicationTypeSchema,
      ])
      .optional(),
    description: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    status: z
      .union([
        z.lazy(() => EnumApplicationStatusWithAggregatesFilterObjectSchema),
        ApplicationStatusSchema,
      ])
      .optional(),
    isPublished: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    ownerId: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional()
      .nullable(),
    permissions: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    manifest: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
    icon: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
  })
  .strict();
export const ApplicationScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ApplicationScalarWhereWithAggregatesInput> =
  applicationscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ApplicationScalarWhereWithAggregatesInput>;
export const ApplicationScalarWhereWithAggregatesInputObjectZodSchema =
  applicationscalarwherewithaggregatesinputSchema;

// File: ApplicationVersionWhereInput.schema.ts

const applicationversionwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ApplicationVersionWhereInputObjectSchema),
        z.lazy(() => ApplicationVersionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ApplicationVersionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ApplicationVersionWhereInputObjectSchema),
        z.lazy(() => ApplicationVersionWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    applicationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    version: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    status: z
      .union([z.lazy(() => EnumApplicationStatusFilterObjectSchema), ApplicationStatusSchema])
      .optional(),
    releaseNotes: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    entryPoints: z
      .union([
        z.lazy(() => ApplicationEntryPointsNullableCompositeFilterObjectSchema),
        z.lazy(() => ApplicationEntryPointsObjectEqualityInputObjectSchema),
      ])
      .optional()
      .nullable(),
    permissions: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    storage: z
      .union([
        z.lazy(() => ApplicationStorageMetaNullableCompositeFilterObjectSchema),
        z.lazy(() => ApplicationStorageMetaObjectEqualityInputObjectSchema),
      ])
      .optional()
      .nullable(),
    manifest: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    application: z
      .union([
        z.lazy(() => ApplicationScalarRelationFilterObjectSchema),
        z.lazy(() => ApplicationWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const ApplicationVersionWhereInputObjectSchema: z.ZodType<Prisma.ApplicationVersionWhereInput> =
  applicationversionwhereinputSchema as unknown as z.ZodType<Prisma.ApplicationVersionWhereInput>;
export const ApplicationVersionWhereInputObjectZodSchema = applicationversionwhereinputSchema;

// File: ApplicationVersionOrderByWithRelationInput.schema.ts
const __makeSchema_ApplicationVersionOrderByWithRelationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      applicationId: SortOrderSchema.optional(),
      version: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      releaseNotes: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      entryPoints: z.lazy(() => ApplicationEntryPointsOrderByInputObjectSchema).optional(),
      permissions: SortOrderSchema.optional(),
      storage: z.lazy(() => ApplicationStorageMetaOrderByInputObjectSchema).optional(),
      manifest: SortOrderSchema.optional(),
      application: z.lazy(() => ApplicationOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationVersionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionOrderByWithRelationInput> =
  __makeSchema_ApplicationVersionOrderByWithRelationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionOrderByWithRelationInput>;
export const ApplicationVersionOrderByWithRelationInputObjectZodSchema =
  __makeSchema_ApplicationVersionOrderByWithRelationInput_schema();

// File: ApplicationVersionWhereUniqueInput.schema.ts
const __makeSchema_ApplicationVersionWhereUniqueInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      applicationId_version: z
        .lazy(() => ApplicationVersionApplicationIdVersionCompoundUniqueInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationVersionWhereUniqueInputObjectSchema: z.ZodType<Prisma.ApplicationVersionWhereUniqueInput> =
  __makeSchema_ApplicationVersionWhereUniqueInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionWhereUniqueInput>;
export const ApplicationVersionWhereUniqueInputObjectZodSchema =
  __makeSchema_ApplicationVersionWhereUniqueInput_schema();

// File: ApplicationVersionOrderByWithAggregationInput.schema.ts
const __makeSchema_ApplicationVersionOrderByWithAggregationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      applicationId: SortOrderSchema.optional(),
      version: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      releaseNotes: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      permissions: SortOrderSchema.optional(),
      manifest: SortOrderSchema.optional(),
      _count: z.lazy(() => ApplicationVersionCountOrderByAggregateInputObjectSchema).optional(),
      _max: z.lazy(() => ApplicationVersionMaxOrderByAggregateInputObjectSchema).optional(),
      _min: z.lazy(() => ApplicationVersionMinOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationVersionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionOrderByWithAggregationInput> =
  __makeSchema_ApplicationVersionOrderByWithAggregationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionOrderByWithAggregationInput>;
export const ApplicationVersionOrderByWithAggregationInputObjectZodSchema =
  __makeSchema_ApplicationVersionOrderByWithAggregationInput_schema();

// File: ApplicationVersionScalarWhereWithAggregatesInput.schema.ts

const applicationversionscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ApplicationVersionScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => ApplicationVersionScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ApplicationVersionScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ApplicationVersionScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => ApplicationVersionScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    applicationId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    version: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    status: z
      .union([
        z.lazy(() => EnumApplicationStatusWithAggregatesFilterObjectSchema),
        ApplicationStatusSchema,
      ])
      .optional(),
    releaseNotes: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    description: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    permissions: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    manifest: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  })
  .strict();
export const ApplicationVersionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ApplicationVersionScalarWhereWithAggregatesInput> =
  applicationversionscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ApplicationVersionScalarWhereWithAggregatesInput>;
export const ApplicationVersionScalarWhereWithAggregatesInputObjectZodSchema =
  applicationversionscalarwherewithaggregatesinputSchema;

// File: UserApplicationWhereInput.schema.ts

const userapplicationwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserApplicationWhereInputObjectSchema),
        z.lazy(() => UserApplicationWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserApplicationWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserApplicationWhereInputObjectSchema),
        z.lazy(() => UserApplicationWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    applicationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    application: z
      .union([
        z.lazy(() => ApplicationScalarRelationFilterObjectSchema),
        z.lazy(() => ApplicationWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const UserApplicationWhereInputObjectSchema: z.ZodType<Prisma.UserApplicationWhereInput> =
  userapplicationwhereinputSchema as unknown as z.ZodType<Prisma.UserApplicationWhereInput>;
export const UserApplicationWhereInputObjectZodSchema = userapplicationwhereinputSchema;

// File: UserApplicationOrderByWithRelationInput.schema.ts
const __makeSchema_UserApplicationOrderByWithRelationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      applicationId: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
      application: z.lazy(() => ApplicationOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();
export const UserApplicationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserApplicationOrderByWithRelationInput> =
  __makeSchema_UserApplicationOrderByWithRelationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationOrderByWithRelationInput>;
export const UserApplicationOrderByWithRelationInputObjectZodSchema =
  __makeSchema_UserApplicationOrderByWithRelationInput_schema();

// File: UserApplicationWhereUniqueInput.schema.ts
const __makeSchema_UserApplicationWhereUniqueInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId_applicationId: z
        .lazy(() => UserApplicationUserIdApplicationIdCompoundUniqueInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserApplicationWhereUniqueInputObjectSchema: z.ZodType<Prisma.UserApplicationWhereUniqueInput> =
  __makeSchema_UserApplicationWhereUniqueInput_schema() as unknown as z.ZodType<Prisma.UserApplicationWhereUniqueInput>;
export const UserApplicationWhereUniqueInputObjectZodSchema =
  __makeSchema_UserApplicationWhereUniqueInput_schema();

// File: UserApplicationOrderByWithAggregationInput.schema.ts
const __makeSchema_UserApplicationOrderByWithAggregationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      applicationId: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z.lazy(() => UserApplicationCountOrderByAggregateInputObjectSchema).optional(),
      _max: z.lazy(() => UserApplicationMaxOrderByAggregateInputObjectSchema).optional(),
      _min: z.lazy(() => UserApplicationMinOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();
export const UserApplicationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UserApplicationOrderByWithAggregationInput> =
  __makeSchema_UserApplicationOrderByWithAggregationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationOrderByWithAggregationInput>;
export const UserApplicationOrderByWithAggregationInputObjectZodSchema =
  __makeSchema_UserApplicationOrderByWithAggregationInput_schema();

// File: UserApplicationScalarWhereWithAggregatesInput.schema.ts

const userapplicationscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserApplicationScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserApplicationScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserApplicationScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserApplicationScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserApplicationScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    applicationId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
  })
  .strict();
export const UserApplicationScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UserApplicationScalarWhereWithAggregatesInput> =
  userapplicationscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UserApplicationScalarWhereWithAggregatesInput>;
export const UserApplicationScalarWhereWithAggregatesInputObjectZodSchema =
  userapplicationscalarwherewithaggregatesinputSchema;

// File: ApiKeyWhereInput.schema.ts

const apikeywhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ApiKeyWhereInputObjectSchema),
        z.lazy(() => ApiKeyWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ApiKeyWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ApiKeyWhereInputObjectSchema),
        z.lazy(() => ApiKeyWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    provider: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    encryptedKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const ApiKeyWhereInputObjectSchema: z.ZodType<Prisma.ApiKeyWhereInput> =
  apikeywhereinputSchema as unknown as z.ZodType<Prisma.ApiKeyWhereInput>;
export const ApiKeyWhereInputObjectZodSchema = apikeywhereinputSchema;

// File: ApiKeyOrderByWithRelationInput.schema.ts
const __makeSchema_ApiKeyOrderByWithRelationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      provider: SortOrderSchema.optional(),
      encryptedKey: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();
export const ApiKeyOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ApiKeyOrderByWithRelationInput> =
  __makeSchema_ApiKeyOrderByWithRelationInput_schema() as unknown as z.ZodType<Prisma.ApiKeyOrderByWithRelationInput>;
export const ApiKeyOrderByWithRelationInputObjectZodSchema =
  __makeSchema_ApiKeyOrderByWithRelationInput_schema();

// File: ApiKeyWhereUniqueInput.schema.ts
const __makeSchema_ApiKeyWhereUniqueInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId_provider: z.lazy(() => ApiKeyUserIdProviderCompoundUniqueInputObjectSchema).optional(),
    })
    .strict();
export const ApiKeyWhereUniqueInputObjectSchema: z.ZodType<Prisma.ApiKeyWhereUniqueInput> =
  __makeSchema_ApiKeyWhereUniqueInput_schema() as unknown as z.ZodType<Prisma.ApiKeyWhereUniqueInput>;
export const ApiKeyWhereUniqueInputObjectZodSchema = __makeSchema_ApiKeyWhereUniqueInput_schema();

// File: ApiKeyOrderByWithAggregationInput.schema.ts
const __makeSchema_ApiKeyOrderByWithAggregationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      provider: SortOrderSchema.optional(),
      encryptedKey: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z.lazy(() => ApiKeyCountOrderByAggregateInputObjectSchema).optional(),
      _max: z.lazy(() => ApiKeyMaxOrderByAggregateInputObjectSchema).optional(),
      _min: z.lazy(() => ApiKeyMinOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();
export const ApiKeyOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ApiKeyOrderByWithAggregationInput> =
  __makeSchema_ApiKeyOrderByWithAggregationInput_schema() as unknown as z.ZodType<Prisma.ApiKeyOrderByWithAggregationInput>;
export const ApiKeyOrderByWithAggregationInputObjectZodSchema =
  __makeSchema_ApiKeyOrderByWithAggregationInput_schema();

// File: ApiKeyScalarWhereWithAggregatesInput.schema.ts

const apikeyscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ApiKeyScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => ApiKeyScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ApiKeyScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ApiKeyScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => ApiKeyScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    provider: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    encryptedKey: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
  })
  .strict();
export const ApiKeyScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ApiKeyScalarWhereWithAggregatesInput> =
  apikeyscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ApiKeyScalarWhereWithAggregatesInput>;
export const ApiKeyScalarWhereWithAggregatesInputObjectZodSchema =
  apikeyscalarwherewithaggregatesinputSchema;

// File: SettingsWhereInput.schema.ts

const settingswhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => SettingsWhereInputObjectSchema),
        z.lazy(() => SettingsWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SettingsWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SettingsWhereInputObjectSchema),
        z.lazy(() => SettingsWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    volume: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
    language: z.union([z.lazy(() => EnumLanguageFilterObjectSchema), LanguageSchema]).optional(),
    theme: z.union([z.lazy(() => EnumThemeFilterObjectSchema), ThemeSchema]).optional(),
    accentColorLight: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    accentColorDark: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    sttProviderName: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    llmProviderName: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    llmModel: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    ttsProviderName: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    welcomeTitle: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    idleTimeoutSeconds: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
    idleMode: z.union([z.lazy(() => EnumIdleModeFilterObjectSchema), IdleModeSchema]).optional(),
    idleCustomImagePath: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    idleRemoteEndpoint: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    modelScene: z
      .union([
        z.lazy(() => ModelSceneSettingsNullableCompositeFilterObjectSchema),
        z.lazy(() => ModelSceneSettingsObjectEqualityInputObjectSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const SettingsWhereInputObjectSchema: z.ZodType<Prisma.SettingsWhereInput> =
  settingswhereinputSchema as unknown as z.ZodType<Prisma.SettingsWhereInput>;
export const SettingsWhereInputObjectZodSchema = settingswhereinputSchema;

// File: SettingsOrderByWithRelationInput.schema.ts
const __makeSchema_SettingsOrderByWithRelationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      volume: SortOrderSchema.optional(),
      language: SortOrderSchema.optional(),
      theme: SortOrderSchema.optional(),
      accentColorLight: SortOrderSchema.optional(),
      accentColorDark: SortOrderSchema.optional(),
      sttProviderName: SortOrderSchema.optional(),
      llmProviderName: SortOrderSchema.optional(),
      llmModel: SortOrderSchema.optional(),
      ttsProviderName: SortOrderSchema.optional(),
      welcomeTitle: SortOrderSchema.optional(),
      idleTimeoutSeconds: SortOrderSchema.optional(),
      idleMode: SortOrderSchema.optional(),
      idleCustomImagePath: SortOrderSchema.optional(),
      idleRemoteEndpoint: SortOrderSchema.optional(),
      modelScene: z.lazy(() => ModelSceneSettingsOrderByInputObjectSchema).optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();
export const SettingsOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.SettingsOrderByWithRelationInput> =
  __makeSchema_SettingsOrderByWithRelationInput_schema() as unknown as z.ZodType<Prisma.SettingsOrderByWithRelationInput>;
export const SettingsOrderByWithRelationInputObjectZodSchema =
  __makeSchema_SettingsOrderByWithRelationInput_schema();

// File: SettingsWhereUniqueInput.schema.ts
const __makeSchema_SettingsWhereUniqueInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId: z.string().max(24).optional(),
    })
    .strict();
export const SettingsWhereUniqueInputObjectSchema: z.ZodType<Prisma.SettingsWhereUniqueInput> =
  __makeSchema_SettingsWhereUniqueInput_schema() as unknown as z.ZodType<Prisma.SettingsWhereUniqueInput>;
export const SettingsWhereUniqueInputObjectZodSchema =
  __makeSchema_SettingsWhereUniqueInput_schema();

// File: SettingsOrderByWithAggregationInput.schema.ts
const __makeSchema_SettingsOrderByWithAggregationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      volume: SortOrderSchema.optional(),
      language: SortOrderSchema.optional(),
      theme: SortOrderSchema.optional(),
      accentColorLight: SortOrderSchema.optional(),
      accentColorDark: SortOrderSchema.optional(),
      sttProviderName: SortOrderSchema.optional(),
      llmProviderName: SortOrderSchema.optional(),
      llmModel: SortOrderSchema.optional(),
      ttsProviderName: SortOrderSchema.optional(),
      welcomeTitle: SortOrderSchema.optional(),
      idleTimeoutSeconds: SortOrderSchema.optional(),
      idleMode: SortOrderSchema.optional(),
      idleCustomImagePath: SortOrderSchema.optional(),
      idleRemoteEndpoint: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z.lazy(() => SettingsCountOrderByAggregateInputObjectSchema).optional(),
      _avg: z.lazy(() => SettingsAvgOrderByAggregateInputObjectSchema).optional(),
      _max: z.lazy(() => SettingsMaxOrderByAggregateInputObjectSchema).optional(),
      _min: z.lazy(() => SettingsMinOrderByAggregateInputObjectSchema).optional(),
      _sum: z.lazy(() => SettingsSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();
export const SettingsOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.SettingsOrderByWithAggregationInput> =
  __makeSchema_SettingsOrderByWithAggregationInput_schema() as unknown as z.ZodType<Prisma.SettingsOrderByWithAggregationInput>;
export const SettingsOrderByWithAggregationInputObjectZodSchema =
  __makeSchema_SettingsOrderByWithAggregationInput_schema();

// File: SettingsScalarWhereWithAggregatesInput.schema.ts

const settingsscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => SettingsScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => SettingsScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SettingsScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SettingsScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => SettingsScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    volume: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()])
      .optional(),
    language: z
      .union([z.lazy(() => EnumLanguageWithAggregatesFilterObjectSchema), LanguageSchema])
      .optional(),
    theme: z
      .union([z.lazy(() => EnumThemeWithAggregatesFilterObjectSchema), ThemeSchema])
      .optional(),
    accentColorLight: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    accentColorDark: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    sttProviderName: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    llmProviderName: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    llmModel: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    ttsProviderName: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    welcomeTitle: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    idleTimeoutSeconds: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()])
      .optional(),
    idleMode: z
      .union([z.lazy(() => EnumIdleModeWithAggregatesFilterObjectSchema), IdleModeSchema])
      .optional(),
    idleCustomImagePath: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    idleRemoteEndpoint: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
  })
  .strict();
export const SettingsScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.SettingsScalarWhereWithAggregatesInput> =
  settingsscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.SettingsScalarWhereWithAggregatesInput>;
export const SettingsScalarWhereWithAggregatesInputObjectZodSchema =
  settingsscalarwherewithaggregatesinputSchema;

// File: DialogWhereInput.schema.ts

const dialogwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => DialogWhereInputObjectSchema),
        z.lazy(() => DialogWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DialogWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DialogWhereInputObjectSchema),
        z.lazy(() => DialogWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(24)]).optional(),
    dialogId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    messages: z
      .union([
        z.lazy(() => ChatMessageCompositeListFilterObjectSchema),
        z.lazy(() => ChatMessageObjectEqualityInputObjectSchema).array(),
      ])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const DialogWhereInputObjectSchema: z.ZodType<Prisma.DialogWhereInput> =
  dialogwhereinputSchema as unknown as z.ZodType<Prisma.DialogWhereInput>;
export const DialogWhereInputObjectZodSchema = dialogwhereinputSchema;

// File: DialogOrderByWithRelationInput.schema.ts
const __makeSchema_DialogOrderByWithRelationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      dialogId: SortOrderSchema.optional(),
      title: SortOrderSchema.optional(),
      messages: z.lazy(() => ChatMessageOrderByCompositeAggregateInputObjectSchema).optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();
export const DialogOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.DialogOrderByWithRelationInput> =
  __makeSchema_DialogOrderByWithRelationInput_schema() as unknown as z.ZodType<Prisma.DialogOrderByWithRelationInput>;
export const DialogOrderByWithRelationInputObjectZodSchema =
  __makeSchema_DialogOrderByWithRelationInput_schema();

// File: DialogWhereUniqueInput.schema.ts
const __makeSchema_DialogWhereUniqueInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId_dialogId: z.lazy(() => DialogUserIdDialogIdCompoundUniqueInputObjectSchema).optional(),
    })
    .strict();
export const DialogWhereUniqueInputObjectSchema: z.ZodType<Prisma.DialogWhereUniqueInput> =
  __makeSchema_DialogWhereUniqueInput_schema() as unknown as z.ZodType<Prisma.DialogWhereUniqueInput>;
export const DialogWhereUniqueInputObjectZodSchema = __makeSchema_DialogWhereUniqueInput_schema();

// File: DialogOrderByWithAggregationInput.schema.ts
const __makeSchema_DialogOrderByWithAggregationInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      dialogId: SortOrderSchema.optional(),
      title: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z.lazy(() => DialogCountOrderByAggregateInputObjectSchema).optional(),
      _max: z.lazy(() => DialogMaxOrderByAggregateInputObjectSchema).optional(),
      _min: z.lazy(() => DialogMinOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();
export const DialogOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.DialogOrderByWithAggregationInput> =
  __makeSchema_DialogOrderByWithAggregationInput_schema() as unknown as z.ZodType<Prisma.DialogOrderByWithAggregationInput>;
export const DialogOrderByWithAggregationInputObjectZodSchema =
  __makeSchema_DialogOrderByWithAggregationInput_schema();

// File: DialogScalarWhereWithAggregatesInput.schema.ts

const dialogscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => DialogScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => DialogScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DialogScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DialogScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => DialogScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(24)])
      .optional(),
    dialogId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
  })
  .strict();
export const DialogScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.DialogScalarWhereWithAggregatesInput> =
  dialogscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.DialogScalarWhereWithAggregatesInput>;
export const DialogScalarWhereWithAggregatesInputObjectZodSchema =
  dialogscalarwherewithaggregatesinputSchema;

// File: UserCreateInput.schema.ts
const __makeSchema_UserCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      applications: z
        .lazy(() => ApplicationCreateNestedManyWithoutOwnerInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyCreateNestedManyWithoutUserInputObjectSchema).optional(),
      settings: z.lazy(() => SettingsCreateNestedOneWithoutUserInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogCreateNestedManyWithoutUserInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateInputObjectSchema: z.ZodType<Prisma.UserCreateInput> =
  __makeSchema_UserCreateInput_schema() as unknown as z.ZodType<Prisma.UserCreateInput>;
export const UserCreateInputObjectZodSchema = __makeSchema_UserCreateInput_schema();

// File: UserUncheckedCreateInput.schema.ts
const __makeSchema_UserUncheckedCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      applications: z
        .lazy(() => ApplicationUncheckedCreateNestedManyWithoutOwnerInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUncheckedCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
      settings: z
        .lazy(() => SettingsUncheckedCreateNestedOneWithoutUserInputObjectSchema)
        .optional(),
      dialogs: z.lazy(() => DialogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
    })
    .strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  __makeSchema_UserUncheckedCreateInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema =
  __makeSchema_UserUncheckedCreateInput_schema();

// File: UserUpdateInput.schema.ts
const __makeSchema_UserUpdateInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      applications: z
        .lazy(() => ApplicationUpdateManyWithoutOwnerNestedInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUpdateManyWithoutUserNestedInputObjectSchema).optional(),
      settings: z.lazy(() => SettingsUpdateOneWithoutUserNestedInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserUpdateInputObjectSchema: z.ZodType<Prisma.UserUpdateInput> =
  __makeSchema_UserUpdateInput_schema() as unknown as z.ZodType<Prisma.UserUpdateInput>;
export const UserUpdateInputObjectZodSchema = __makeSchema_UserUpdateInput_schema();

// File: UserUncheckedUpdateInput.schema.ts
const __makeSchema_UserUncheckedUpdateInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      applications: z
        .lazy(() => ApplicationUncheckedUpdateManyWithoutOwnerNestedInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
      settings: z
        .lazy(() => SettingsUncheckedUpdateOneWithoutUserNestedInputObjectSchema)
        .optional(),
      dialogs: z.lazy(() => DialogUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  __makeSchema_UserUncheckedUpdateInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateInput>;
export const UserUncheckedUpdateInputObjectZodSchema =
  __makeSchema_UserUncheckedUpdateInput_schema();

// File: UserCreateManyInput.schema.ts
const __makeSchema_UserCreateManyInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const UserCreateManyInputObjectSchema: z.ZodType<Prisma.UserCreateManyInput> =
  __makeSchema_UserCreateManyInput_schema() as unknown as z.ZodType<Prisma.UserCreateManyInput>;
export const UserCreateManyInputObjectZodSchema = __makeSchema_UserCreateManyInput_schema();

// File: UserUpdateManyMutationInput.schema.ts
const __makeSchema_UserUpdateManyMutationInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  __makeSchema_UserUpdateManyMutationInput_schema() as unknown as z.ZodType<Prisma.UserUpdateManyMutationInput>;
export const UserUpdateManyMutationInputObjectZodSchema =
  __makeSchema_UserUpdateManyMutationInput_schema();

// File: UserUncheckedUpdateManyInput.schema.ts
const __makeSchema_UserUncheckedUpdateManyInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  __makeSchema_UserUncheckedUpdateManyInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateManyInput>;
export const UserUncheckedUpdateManyInputObjectZodSchema =
  __makeSchema_UserUncheckedUpdateManyInput_schema();

// File: ApplicationCreateInput.schema.ts
const __makeSchema_ApplicationCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      key: z.string(),
      name: z.string(),
      version: z.string(),
      type: ApplicationTypeSchema,
      description: z.string().optional().nullable(),
      status: ApplicationStatusSchema.optional(),
      isPublished: z.boolean().optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationCreatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
      icon: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      owner: z.lazy(() => UserCreateNestedOneWithoutApplicationsInputObjectSchema).optional(),
      versions: z
        .lazy(() => ApplicationVersionCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
      userInstalls: z
        .lazy(() => UserApplicationCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationCreateInputObjectSchema: z.ZodType<Prisma.ApplicationCreateInput> =
  __makeSchema_ApplicationCreateInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateInput>;
export const ApplicationCreateInputObjectZodSchema = __makeSchema_ApplicationCreateInput_schema();

// File: ApplicationUncheckedCreateInput.schema.ts
const __makeSchema_ApplicationUncheckedCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      key: z.string(),
      name: z.string(),
      version: z.string(),
      type: ApplicationTypeSchema,
      description: z.string().optional().nullable(),
      status: ApplicationStatusSchema.optional(),
      isPublished: z.boolean().optional(),
      ownerId: z.string().max(24).optional().nullable(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationCreatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
      icon: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      versions: z
        .lazy(() => ApplicationVersionUncheckedCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
      userInstalls: z
        .lazy(() => UserApplicationUncheckedCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedCreateInput> =
  __makeSchema_ApplicationUncheckedCreateInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedCreateInput>;
export const ApplicationUncheckedCreateInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedCreateInput_schema();

// File: ApplicationUpdateInput.schema.ts
const __makeSchema_ApplicationUpdateInput_schema = () =>
  z
    .object({
      key: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      type: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => EnumApplicationTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPublished: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationUpdatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      icon: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      owner: z.lazy(() => UserUpdateOneWithoutApplicationsNestedInputObjectSchema).optional(),
      versions: z
        .lazy(() => ApplicationVersionUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
      userInstalls: z
        .lazy(() => UserApplicationUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUpdateInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateInput> =
  __makeSchema_ApplicationUpdateInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateInput>;
export const ApplicationUpdateInputObjectZodSchema = __makeSchema_ApplicationUpdateInput_schema();

// File: ApplicationUncheckedUpdateInput.schema.ts
const __makeSchema_ApplicationUncheckedUpdateInput_schema = () =>
  z
    .object({
      key: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      type: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => EnumApplicationTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPublished: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      ownerId: z
        .union([
          z.string().max(24),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationUpdatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      icon: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      versions: z
        .lazy(() => ApplicationVersionUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
      userInstalls: z
        .lazy(() => UserApplicationUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedUpdateInput> =
  __makeSchema_ApplicationUncheckedUpdateInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedUpdateInput>;
export const ApplicationUncheckedUpdateInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedUpdateInput_schema();

// File: ApplicationCreateManyInput.schema.ts
const __makeSchema_ApplicationCreateManyInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      key: z.string(),
      name: z.string(),
      version: z.string(),
      type: ApplicationTypeSchema,
      description: z.string().optional().nullable(),
      status: ApplicationStatusSchema.optional(),
      isPublished: z.boolean().optional(),
      ownerId: z.string().max(24).optional().nullable(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationCreatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
      icon: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const ApplicationCreateManyInputObjectSchema: z.ZodType<Prisma.ApplicationCreateManyInput> =
  __makeSchema_ApplicationCreateManyInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateManyInput>;
export const ApplicationCreateManyInputObjectZodSchema =
  __makeSchema_ApplicationCreateManyInput_schema();

// File: ApplicationUpdateManyMutationInput.schema.ts
const __makeSchema_ApplicationUpdateManyMutationInput_schema = () =>
  z
    .object({
      key: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      type: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => EnumApplicationTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPublished: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationUpdatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      icon: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApplicationUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateManyMutationInput> =
  __makeSchema_ApplicationUpdateManyMutationInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateManyMutationInput>;
export const ApplicationUpdateManyMutationInputObjectZodSchema =
  __makeSchema_ApplicationUpdateManyMutationInput_schema();

// File: ApplicationUncheckedUpdateManyInput.schema.ts
const __makeSchema_ApplicationUncheckedUpdateManyInput_schema = () =>
  z
    .object({
      key: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      type: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => EnumApplicationTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPublished: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      ownerId: z
        .union([
          z.string().max(24),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationUpdatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      icon: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApplicationUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedUpdateManyInput> =
  __makeSchema_ApplicationUncheckedUpdateManyInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedUpdateManyInput>;
export const ApplicationUncheckedUpdateManyInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedUpdateManyInput_schema();

// File: ApplicationVersionCreateInput.schema.ts
const __makeSchema_ApplicationVersionCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      version: z.string(),
      status: ApplicationStatusSchema.optional(),
      releaseNotes: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionCreatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
      application: z.lazy(() => ApplicationCreateNestedOneWithoutVersionsInputObjectSchema),
    })
    .strict();
export const ApplicationVersionCreateInputObjectSchema: z.ZodType<Prisma.ApplicationVersionCreateInput> =
  __makeSchema_ApplicationVersionCreateInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionCreateInput>;
export const ApplicationVersionCreateInputObjectZodSchema =
  __makeSchema_ApplicationVersionCreateInput_schema();

// File: ApplicationVersionUncheckedCreateInput.schema.ts
const __makeSchema_ApplicationVersionUncheckedCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      applicationId: z.string().max(24),
      version: z.string(),
      status: ApplicationStatusSchema.optional(),
      releaseNotes: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionCreatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
    })
    .strict();
export const ApplicationVersionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUncheckedCreateInput> =
  __makeSchema_ApplicationVersionUncheckedCreateInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUncheckedCreateInput>;
export const ApplicationVersionUncheckedCreateInputObjectZodSchema =
  __makeSchema_ApplicationVersionUncheckedCreateInput_schema();

// File: ApplicationVersionUpdateInput.schema.ts
const __makeSchema_ApplicationVersionUpdateInput_schema = () =>
  z
    .object({
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      releaseNotes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionUpdatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      application: z
        .lazy(() => ApplicationUpdateOneRequiredWithoutVersionsNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationVersionUpdateInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUpdateInput> =
  __makeSchema_ApplicationVersionUpdateInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUpdateInput>;
export const ApplicationVersionUpdateInputObjectZodSchema =
  __makeSchema_ApplicationVersionUpdateInput_schema();

// File: ApplicationVersionUncheckedUpdateInput.schema.ts
const __makeSchema_ApplicationVersionUncheckedUpdateInput_schema = () =>
  z
    .object({
      applicationId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      releaseNotes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionUpdatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
    })
    .strict();
export const ApplicationVersionUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUncheckedUpdateInput> =
  __makeSchema_ApplicationVersionUncheckedUpdateInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUncheckedUpdateInput>;
export const ApplicationVersionUncheckedUpdateInputObjectZodSchema =
  __makeSchema_ApplicationVersionUncheckedUpdateInput_schema();

// File: ApplicationVersionCreateManyInput.schema.ts
const __makeSchema_ApplicationVersionCreateManyInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      applicationId: z.string().max(24),
      version: z.string(),
      status: ApplicationStatusSchema.optional(),
      releaseNotes: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionCreatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
    })
    .strict();
export const ApplicationVersionCreateManyInputObjectSchema: z.ZodType<Prisma.ApplicationVersionCreateManyInput> =
  __makeSchema_ApplicationVersionCreateManyInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionCreateManyInput>;
export const ApplicationVersionCreateManyInputObjectZodSchema =
  __makeSchema_ApplicationVersionCreateManyInput_schema();

// File: ApplicationVersionUpdateManyMutationInput.schema.ts
const __makeSchema_ApplicationVersionUpdateManyMutationInput_schema = () =>
  z
    .object({
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      releaseNotes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionUpdatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
    })
    .strict();
export const ApplicationVersionUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUpdateManyMutationInput> =
  __makeSchema_ApplicationVersionUpdateManyMutationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUpdateManyMutationInput>;
export const ApplicationVersionUpdateManyMutationInputObjectZodSchema =
  __makeSchema_ApplicationVersionUpdateManyMutationInput_schema();

// File: ApplicationVersionUncheckedUpdateManyInput.schema.ts
const __makeSchema_ApplicationVersionUncheckedUpdateManyInput_schema = () =>
  z
    .object({
      applicationId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      releaseNotes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionUpdatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
    })
    .strict();
export const ApplicationVersionUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUncheckedUpdateManyInput> =
  __makeSchema_ApplicationVersionUncheckedUpdateManyInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUncheckedUpdateManyInput>;
export const ApplicationVersionUncheckedUpdateManyInputObjectZodSchema =
  __makeSchema_ApplicationVersionUncheckedUpdateManyInput_schema();

// File: UserApplicationCreateInput.schema.ts
const __makeSchema_UserApplicationCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutInstallsInputObjectSchema),
      application: z.lazy(() => ApplicationCreateNestedOneWithoutUserInstallsInputObjectSchema),
    })
    .strict();
export const UserApplicationCreateInputObjectSchema: z.ZodType<Prisma.UserApplicationCreateInput> =
  __makeSchema_UserApplicationCreateInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateInput>;
export const UserApplicationCreateInputObjectZodSchema =
  __makeSchema_UserApplicationCreateInput_schema();

// File: UserApplicationUncheckedCreateInput.schema.ts
const __makeSchema_UserApplicationUncheckedCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId: z.string().max(24),
      applicationId: z.string().max(24),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedCreateInput> =
  __makeSchema_UserApplicationUncheckedCreateInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedCreateInput>;
export const UserApplicationUncheckedCreateInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedCreateInput_schema();

// File: UserApplicationUpdateInput.schema.ts
const __makeSchema_UserApplicationUpdateInput_schema = () =>
  z
    .object({
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      user: z.lazy(() => UserUpdateOneRequiredWithoutInstallsNestedInputObjectSchema).optional(),
      application: z
        .lazy(() => ApplicationUpdateOneRequiredWithoutUserInstallsNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserApplicationUpdateInputObjectSchema: z.ZodType<Prisma.UserApplicationUpdateInput> =
  __makeSchema_UserApplicationUpdateInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpdateInput>;
export const UserApplicationUpdateInputObjectZodSchema =
  __makeSchema_UserApplicationUpdateInput_schema();

// File: UserApplicationUncheckedUpdateInput.schema.ts
const __makeSchema_UserApplicationUncheckedUpdateInput_schema = () =>
  z
    .object({
      userId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      applicationId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedUpdateInput> =
  __makeSchema_UserApplicationUncheckedUpdateInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedUpdateInput>;
export const UserApplicationUncheckedUpdateInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedUpdateInput_schema();

// File: UserApplicationCreateManyInput.schema.ts
const __makeSchema_UserApplicationCreateManyInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId: z.string().max(24),
      applicationId: z.string().max(24),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const UserApplicationCreateManyInputObjectSchema: z.ZodType<Prisma.UserApplicationCreateManyInput> =
  __makeSchema_UserApplicationCreateManyInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateManyInput>;
export const UserApplicationCreateManyInputObjectZodSchema =
  __makeSchema_UserApplicationCreateManyInput_schema();

// File: UserApplicationUpdateManyMutationInput.schema.ts
const __makeSchema_UserApplicationUpdateManyMutationInput_schema = () =>
  z
    .object({
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.UserApplicationUpdateManyMutationInput> =
  __makeSchema_UserApplicationUpdateManyMutationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpdateManyMutationInput>;
export const UserApplicationUpdateManyMutationInputObjectZodSchema =
  __makeSchema_UserApplicationUpdateManyMutationInput_schema();

// File: UserApplicationUncheckedUpdateManyInput.schema.ts
const __makeSchema_UserApplicationUncheckedUpdateManyInput_schema = () =>
  z
    .object({
      userId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      applicationId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedUpdateManyInput> =
  __makeSchema_UserApplicationUncheckedUpdateManyInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedUpdateManyInput>;
export const UserApplicationUncheckedUpdateManyInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedUpdateManyInput_schema();

// File: ApiKeyCreateInput.schema.ts
const __makeSchema_ApiKeyCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      provider: z.string(),
      encryptedKey: z.string(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutApiKeysInputObjectSchema),
    })
    .strict();
export const ApiKeyCreateInputObjectSchema: z.ZodType<Prisma.ApiKeyCreateInput> =
  __makeSchema_ApiKeyCreateInput_schema() as unknown as z.ZodType<Prisma.ApiKeyCreateInput>;
export const ApiKeyCreateInputObjectZodSchema = __makeSchema_ApiKeyCreateInput_schema();

// File: ApiKeyUncheckedCreateInput.schema.ts
const __makeSchema_ApiKeyUncheckedCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId: z.string().max(24),
      provider: z.string(),
      encryptedKey: z.string(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const ApiKeyUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ApiKeyUncheckedCreateInput> =
  __makeSchema_ApiKeyUncheckedCreateInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUncheckedCreateInput>;
export const ApiKeyUncheckedCreateInputObjectZodSchema =
  __makeSchema_ApiKeyUncheckedCreateInput_schema();

// File: ApiKeyUpdateInput.schema.ts
const __makeSchema_ApiKeyUpdateInput_schema = () =>
  z
    .object({
      provider: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      encryptedKey: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      user: z.lazy(() => UserUpdateOneRequiredWithoutApiKeysNestedInputObjectSchema).optional(),
    })
    .strict();
export const ApiKeyUpdateInputObjectSchema: z.ZodType<Prisma.ApiKeyUpdateInput> =
  __makeSchema_ApiKeyUpdateInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUpdateInput>;
export const ApiKeyUpdateInputObjectZodSchema = __makeSchema_ApiKeyUpdateInput_schema();

// File: ApiKeyUncheckedUpdateInput.schema.ts
const __makeSchema_ApiKeyUncheckedUpdateInput_schema = () =>
  z
    .object({
      userId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      provider: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      encryptedKey: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApiKeyUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.ApiKeyUncheckedUpdateInput> =
  __makeSchema_ApiKeyUncheckedUpdateInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUncheckedUpdateInput>;
export const ApiKeyUncheckedUpdateInputObjectZodSchema =
  __makeSchema_ApiKeyUncheckedUpdateInput_schema();

// File: ApiKeyCreateManyInput.schema.ts
const __makeSchema_ApiKeyCreateManyInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId: z.string().max(24),
      provider: z.string(),
      encryptedKey: z.string(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const ApiKeyCreateManyInputObjectSchema: z.ZodType<Prisma.ApiKeyCreateManyInput> =
  __makeSchema_ApiKeyCreateManyInput_schema() as unknown as z.ZodType<Prisma.ApiKeyCreateManyInput>;
export const ApiKeyCreateManyInputObjectZodSchema = __makeSchema_ApiKeyCreateManyInput_schema();

// File: ApiKeyUpdateManyMutationInput.schema.ts
const __makeSchema_ApiKeyUpdateManyMutationInput_schema = () =>
  z
    .object({
      provider: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      encryptedKey: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApiKeyUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.ApiKeyUpdateManyMutationInput> =
  __makeSchema_ApiKeyUpdateManyMutationInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUpdateManyMutationInput>;
export const ApiKeyUpdateManyMutationInputObjectZodSchema =
  __makeSchema_ApiKeyUpdateManyMutationInput_schema();

// File: ApiKeyUncheckedUpdateManyInput.schema.ts
const __makeSchema_ApiKeyUncheckedUpdateManyInput_schema = () =>
  z
    .object({
      userId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      provider: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      encryptedKey: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApiKeyUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.ApiKeyUncheckedUpdateManyInput> =
  __makeSchema_ApiKeyUncheckedUpdateManyInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUncheckedUpdateManyInput>;
export const ApiKeyUncheckedUpdateManyInputObjectZodSchema =
  __makeSchema_ApiKeyUncheckedUpdateManyInput_schema();

// File: SettingsCreateInput.schema.ts
const __makeSchema_SettingsCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      volume: z.number().int().optional(),
      language: LanguageSchema.optional(),
      theme: ThemeSchema.optional(),
      accentColorLight: z.string().optional(),
      accentColorDark: z.string().optional(),
      sttProviderName: z.string().optional().nullable(),
      llmProviderName: z.string().optional().nullable(),
      llmModel: z.string().optional().nullable(),
      ttsProviderName: z.string().optional().nullable(),
      welcomeTitle: z.string().optional(),
      idleTimeoutSeconds: z.number().int().optional(),
      idleMode: IdleModeSchema.optional(),
      idleCustomImagePath: z.string().optional(),
      idleRemoteEndpoint: z.string().optional(),
      modelScene: z
        .union([
          z.lazy(() => ModelSceneSettingsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutSettingsInputObjectSchema),
    })
    .strict();
export const SettingsCreateInputObjectSchema: z.ZodType<Prisma.SettingsCreateInput> =
  __makeSchema_SettingsCreateInput_schema() as unknown as z.ZodType<Prisma.SettingsCreateInput>;
export const SettingsCreateInputObjectZodSchema = __makeSchema_SettingsCreateInput_schema();

// File: SettingsUncheckedCreateInput.schema.ts
const __makeSchema_SettingsUncheckedCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId: z.string().max(24),
      volume: z.number().int().optional(),
      language: LanguageSchema.optional(),
      theme: ThemeSchema.optional(),
      accentColorLight: z.string().optional(),
      accentColorDark: z.string().optional(),
      sttProviderName: z.string().optional().nullable(),
      llmProviderName: z.string().optional().nullable(),
      llmModel: z.string().optional().nullable(),
      ttsProviderName: z.string().optional().nullable(),
      welcomeTitle: z.string().optional(),
      idleTimeoutSeconds: z.number().int().optional(),
      idleMode: IdleModeSchema.optional(),
      idleCustomImagePath: z.string().optional(),
      idleRemoteEndpoint: z.string().optional(),
      modelScene: z
        .union([
          z.lazy(() => ModelSceneSettingsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const SettingsUncheckedCreateInputObjectSchema: z.ZodType<Prisma.SettingsUncheckedCreateInput> =
  __makeSchema_SettingsUncheckedCreateInput_schema() as unknown as z.ZodType<Prisma.SettingsUncheckedCreateInput>;
export const SettingsUncheckedCreateInputObjectZodSchema =
  __makeSchema_SettingsUncheckedCreateInput_schema();

// File: SettingsUpdateInput.schema.ts
const __makeSchema_SettingsUpdateInput_schema = () =>
  z
    .object({
      volume: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      language: z
        .union([LanguageSchema, z.lazy(() => EnumLanguageFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      theme: z
        .union([ThemeSchema, z.lazy(() => EnumThemeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorLight: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorDark: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      sttProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmModel: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      ttsProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      welcomeTitle: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleTimeoutSeconds: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleMode: z
        .union([IdleModeSchema, z.lazy(() => EnumIdleModeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleCustomImagePath: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleRemoteEndpoint: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      modelScene: z
        .union([
          z.lazy(() => ModelSceneSettingsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      user: z.lazy(() => UserUpdateOneRequiredWithoutSettingsNestedInputObjectSchema).optional(),
    })
    .strict();
export const SettingsUpdateInputObjectSchema: z.ZodType<Prisma.SettingsUpdateInput> =
  __makeSchema_SettingsUpdateInput_schema() as unknown as z.ZodType<Prisma.SettingsUpdateInput>;
export const SettingsUpdateInputObjectZodSchema = __makeSchema_SettingsUpdateInput_schema();

// File: SettingsUncheckedUpdateInput.schema.ts
const __makeSchema_SettingsUncheckedUpdateInput_schema = () =>
  z
    .object({
      userId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      volume: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      language: z
        .union([LanguageSchema, z.lazy(() => EnumLanguageFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      theme: z
        .union([ThemeSchema, z.lazy(() => EnumThemeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorLight: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorDark: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      sttProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmModel: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      ttsProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      welcomeTitle: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleTimeoutSeconds: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleMode: z
        .union([IdleModeSchema, z.lazy(() => EnumIdleModeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleCustomImagePath: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleRemoteEndpoint: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      modelScene: z
        .union([
          z.lazy(() => ModelSceneSettingsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const SettingsUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.SettingsUncheckedUpdateInput> =
  __makeSchema_SettingsUncheckedUpdateInput_schema() as unknown as z.ZodType<Prisma.SettingsUncheckedUpdateInput>;
export const SettingsUncheckedUpdateInputObjectZodSchema =
  __makeSchema_SettingsUncheckedUpdateInput_schema();

// File: SettingsCreateManyInput.schema.ts
const __makeSchema_SettingsCreateManyInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId: z.string().max(24),
      volume: z.number().int().optional(),
      language: LanguageSchema.optional(),
      theme: ThemeSchema.optional(),
      accentColorLight: z.string().optional(),
      accentColorDark: z.string().optional(),
      sttProviderName: z.string().optional().nullable(),
      llmProviderName: z.string().optional().nullable(),
      llmModel: z.string().optional().nullable(),
      ttsProviderName: z.string().optional().nullable(),
      welcomeTitle: z.string().optional(),
      idleTimeoutSeconds: z.number().int().optional(),
      idleMode: IdleModeSchema.optional(),
      idleCustomImagePath: z.string().optional(),
      idleRemoteEndpoint: z.string().optional(),
      modelScene: z
        .union([
          z.lazy(() => ModelSceneSettingsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const SettingsCreateManyInputObjectSchema: z.ZodType<Prisma.SettingsCreateManyInput> =
  __makeSchema_SettingsCreateManyInput_schema() as unknown as z.ZodType<Prisma.SettingsCreateManyInput>;
export const SettingsCreateManyInputObjectZodSchema = __makeSchema_SettingsCreateManyInput_schema();

// File: SettingsUpdateManyMutationInput.schema.ts
const __makeSchema_SettingsUpdateManyMutationInput_schema = () =>
  z
    .object({
      volume: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      language: z
        .union([LanguageSchema, z.lazy(() => EnumLanguageFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      theme: z
        .union([ThemeSchema, z.lazy(() => EnumThemeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorLight: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorDark: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      sttProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmModel: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      ttsProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      welcomeTitle: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleTimeoutSeconds: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleMode: z
        .union([IdleModeSchema, z.lazy(() => EnumIdleModeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleCustomImagePath: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleRemoteEndpoint: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      modelScene: z
        .union([
          z.lazy(() => ModelSceneSettingsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const SettingsUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.SettingsUpdateManyMutationInput> =
  __makeSchema_SettingsUpdateManyMutationInput_schema() as unknown as z.ZodType<Prisma.SettingsUpdateManyMutationInput>;
export const SettingsUpdateManyMutationInputObjectZodSchema =
  __makeSchema_SettingsUpdateManyMutationInput_schema();

// File: SettingsUncheckedUpdateManyInput.schema.ts
const __makeSchema_SettingsUncheckedUpdateManyInput_schema = () =>
  z
    .object({
      userId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      volume: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      language: z
        .union([LanguageSchema, z.lazy(() => EnumLanguageFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      theme: z
        .union([ThemeSchema, z.lazy(() => EnumThemeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorLight: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorDark: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      sttProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmModel: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      ttsProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      welcomeTitle: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleTimeoutSeconds: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleMode: z
        .union([IdleModeSchema, z.lazy(() => EnumIdleModeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleCustomImagePath: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleRemoteEndpoint: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      modelScene: z
        .union([
          z.lazy(() => ModelSceneSettingsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const SettingsUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.SettingsUncheckedUpdateManyInput> =
  __makeSchema_SettingsUncheckedUpdateManyInput_schema() as unknown as z.ZodType<Prisma.SettingsUncheckedUpdateManyInput>;
export const SettingsUncheckedUpdateManyInputObjectZodSchema =
  __makeSchema_SettingsUncheckedUpdateManyInput_schema();

// File: DialogCreateInput.schema.ts
const __makeSchema_DialogCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      dialogId: z.string(),
      title: z.string(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListCreateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutDialogsInputObjectSchema),
    })
    .strict();
export const DialogCreateInputObjectSchema: z.ZodType<Prisma.DialogCreateInput> =
  __makeSchema_DialogCreateInput_schema() as unknown as z.ZodType<Prisma.DialogCreateInput>;
export const DialogCreateInputObjectZodSchema = __makeSchema_DialogCreateInput_schema();

// File: DialogUncheckedCreateInput.schema.ts
const __makeSchema_DialogUncheckedCreateInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId: z.string().max(24),
      dialogId: z.string(),
      title: z.string(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListCreateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const DialogUncheckedCreateInputObjectSchema: z.ZodType<Prisma.DialogUncheckedCreateInput> =
  __makeSchema_DialogUncheckedCreateInput_schema() as unknown as z.ZodType<Prisma.DialogUncheckedCreateInput>;
export const DialogUncheckedCreateInputObjectZodSchema =
  __makeSchema_DialogUncheckedCreateInput_schema();

// File: DialogUpdateInput.schema.ts
const __makeSchema_DialogUpdateInput_schema = () =>
  z
    .object({
      dialogId: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      title: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      user: z.lazy(() => UserUpdateOneRequiredWithoutDialogsNestedInputObjectSchema).optional(),
    })
    .strict();
export const DialogUpdateInputObjectSchema: z.ZodType<Prisma.DialogUpdateInput> =
  __makeSchema_DialogUpdateInput_schema() as unknown as z.ZodType<Prisma.DialogUpdateInput>;
export const DialogUpdateInputObjectZodSchema = __makeSchema_DialogUpdateInput_schema();

// File: DialogUncheckedUpdateInput.schema.ts
const __makeSchema_DialogUncheckedUpdateInput_schema = () =>
  z
    .object({
      userId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      dialogId: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      title: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const DialogUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.DialogUncheckedUpdateInput> =
  __makeSchema_DialogUncheckedUpdateInput_schema() as unknown as z.ZodType<Prisma.DialogUncheckedUpdateInput>;
export const DialogUncheckedUpdateInputObjectZodSchema =
  __makeSchema_DialogUncheckedUpdateInput_schema();

// File: DialogCreateManyInput.schema.ts
const __makeSchema_DialogCreateManyInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId: z.string().max(24),
      dialogId: z.string(),
      title: z.string(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListCreateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const DialogCreateManyInputObjectSchema: z.ZodType<Prisma.DialogCreateManyInput> =
  __makeSchema_DialogCreateManyInput_schema() as unknown as z.ZodType<Prisma.DialogCreateManyInput>;
export const DialogCreateManyInputObjectZodSchema = __makeSchema_DialogCreateManyInput_schema();

// File: DialogUpdateManyMutationInput.schema.ts
const __makeSchema_DialogUpdateManyMutationInput_schema = () =>
  z
    .object({
      dialogId: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      title: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const DialogUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.DialogUpdateManyMutationInput> =
  __makeSchema_DialogUpdateManyMutationInput_schema() as unknown as z.ZodType<Prisma.DialogUpdateManyMutationInput>;
export const DialogUpdateManyMutationInputObjectZodSchema =
  __makeSchema_DialogUpdateManyMutationInput_schema();

// File: DialogUncheckedUpdateManyInput.schema.ts
const __makeSchema_DialogUncheckedUpdateManyInput_schema = () =>
  z
    .object({
      userId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      dialogId: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      title: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const DialogUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.DialogUncheckedUpdateManyInput> =
  __makeSchema_DialogUncheckedUpdateManyInput_schema() as unknown as z.ZodType<Prisma.DialogUncheckedUpdateManyInput>;
export const DialogUncheckedUpdateManyInputObjectZodSchema =
  __makeSchema_DialogUncheckedUpdateManyInput_schema();

// File: StringFilter.schema.ts
const __makeSchema_StringFilter_schema = () =>
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: QueryModeSchema.optional(),
      not: z.union([z.string(), z.lazy(() => NestedStringFilterObjectSchema)]).optional(),
    })
    .strict();
export const StringFilterObjectSchema: z.ZodType<Prisma.StringFilter> =
  __makeSchema_StringFilter_schema() as unknown as z.ZodType<Prisma.StringFilter>;
export const StringFilterObjectZodSchema = __makeSchema_StringFilter_schema();

// File: StringNullableFilter.schema.ts
const __makeSchema_StringNullableFilter_schema = () =>
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: QueryModeSchema.optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterObjectSchema)])
        .optional()
        .nullable(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const StringNullableFilterObjectSchema: z.ZodType<Prisma.StringNullableFilter> =
  __makeSchema_StringNullableFilter_schema() as unknown as z.ZodType<Prisma.StringNullableFilter>;
export const StringNullableFilterObjectZodSchema = __makeSchema_StringNullableFilter_schema();

// File: OAuthProviderCompositeListFilter.schema.ts
const __makeSchema_OAuthProviderCompositeListFilter_schema = () =>
  z
    .object({
      equals: z
        .lazy(() => OAuthProviderObjectEqualityInputObjectSchema)
        .array()
        .optional(),
      every: z.lazy(() => OAuthProviderWhereInputObjectSchema).optional(),
      some: z.lazy(() => OAuthProviderWhereInputObjectSchema).optional(),
      none: z.lazy(() => OAuthProviderWhereInputObjectSchema).optional(),
      isEmpty: z.boolean().optional(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const OAuthProviderCompositeListFilterObjectSchema: z.ZodType<Prisma.OAuthProviderCompositeListFilter> =
  __makeSchema_OAuthProviderCompositeListFilter_schema() as unknown as z.ZodType<Prisma.OAuthProviderCompositeListFilter>;
export const OAuthProviderCompositeListFilterObjectZodSchema =
  __makeSchema_OAuthProviderCompositeListFilter_schema();

// File: OAuthProviderObjectEqualityInput.schema.ts
const __makeSchema_OAuthProviderObjectEqualityInput_schema = () =>
  z
    .object({
      provider: z.string(),
      providerId: z.string(),
    })
    .strict();
export const OAuthProviderObjectEqualityInputObjectSchema: z.ZodType<Prisma.OAuthProviderObjectEqualityInput> =
  __makeSchema_OAuthProviderObjectEqualityInput_schema() as unknown as z.ZodType<Prisma.OAuthProviderObjectEqualityInput>;
export const OAuthProviderObjectEqualityInputObjectZodSchema =
  __makeSchema_OAuthProviderObjectEqualityInput_schema();

// File: DateTimeNullableFilter.schema.ts
const __makeSchema_DateTimeNullableFilter_schema = () =>
  z
    .object({
      equals: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      in: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
      notIn: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
      lt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      lte: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      gt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      gte: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      not: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NestedDateTimeNullableFilterObjectSchema),
        ])
        .optional()
        .nullable(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const DateTimeNullableFilterObjectSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  __makeSchema_DateTimeNullableFilter_schema() as unknown as z.ZodType<Prisma.DateTimeNullableFilter>;
export const DateTimeNullableFilterObjectZodSchema = __makeSchema_DateTimeNullableFilter_schema();

// File: DateTimeFilter.schema.ts
const __makeSchema_DateTimeFilter_schema = () =>
  z
    .object({
      equals: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      in: z.union([z.date().array(), z.string().datetime().array()]).optional(),
      notIn: z.union([z.date().array(), z.string().datetime().array()]).optional(),
      lt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      lte: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      gt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      gte: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      not: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NestedDateTimeFilterObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const DateTimeFilterObjectSchema: z.ZodType<Prisma.DateTimeFilter> =
  __makeSchema_DateTimeFilter_schema() as unknown as z.ZodType<Prisma.DateTimeFilter>;
export const DateTimeFilterObjectZodSchema = __makeSchema_DateTimeFilter_schema();

// File: ApplicationListRelationFilter.schema.ts
const __makeSchema_ApplicationListRelationFilter_schema = () =>
  z
    .object({
      every: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
      some: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
      none: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationListRelationFilterObjectSchema: z.ZodType<Prisma.ApplicationListRelationFilter> =
  __makeSchema_ApplicationListRelationFilter_schema() as unknown as z.ZodType<Prisma.ApplicationListRelationFilter>;
export const ApplicationListRelationFilterObjectZodSchema =
  __makeSchema_ApplicationListRelationFilter_schema();

// File: UserApplicationListRelationFilter.schema.ts
const __makeSchema_UserApplicationListRelationFilter_schema = () =>
  z
    .object({
      every: z.lazy(() => UserApplicationWhereInputObjectSchema).optional(),
      some: z.lazy(() => UserApplicationWhereInputObjectSchema).optional(),
      none: z.lazy(() => UserApplicationWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserApplicationListRelationFilterObjectSchema: z.ZodType<Prisma.UserApplicationListRelationFilter> =
  __makeSchema_UserApplicationListRelationFilter_schema() as unknown as z.ZodType<Prisma.UserApplicationListRelationFilter>;
export const UserApplicationListRelationFilterObjectZodSchema =
  __makeSchema_UserApplicationListRelationFilter_schema();

// File: ApiKeyListRelationFilter.schema.ts
const __makeSchema_ApiKeyListRelationFilter_schema = () =>
  z
    .object({
      every: z.lazy(() => ApiKeyWhereInputObjectSchema).optional(),
      some: z.lazy(() => ApiKeyWhereInputObjectSchema).optional(),
      none: z.lazy(() => ApiKeyWhereInputObjectSchema).optional(),
    })
    .strict();
export const ApiKeyListRelationFilterObjectSchema: z.ZodType<Prisma.ApiKeyListRelationFilter> =
  __makeSchema_ApiKeyListRelationFilter_schema() as unknown as z.ZodType<Prisma.ApiKeyListRelationFilter>;
export const ApiKeyListRelationFilterObjectZodSchema =
  __makeSchema_ApiKeyListRelationFilter_schema();

// File: SettingsNullableScalarRelationFilter.schema.ts
const __makeSchema_SettingsNullableScalarRelationFilter_schema = () =>
  z
    .object({
      is: z
        .lazy(() => SettingsWhereInputObjectSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => SettingsWhereInputObjectSchema)
        .optional()
        .nullable(),
    })
    .strict();
export const SettingsNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.SettingsNullableScalarRelationFilter> =
  __makeSchema_SettingsNullableScalarRelationFilter_schema() as unknown as z.ZodType<Prisma.SettingsNullableScalarRelationFilter>;
export const SettingsNullableScalarRelationFilterObjectZodSchema =
  __makeSchema_SettingsNullableScalarRelationFilter_schema();

// File: DialogListRelationFilter.schema.ts
const __makeSchema_DialogListRelationFilter_schema = () =>
  z
    .object({
      every: z.lazy(() => DialogWhereInputObjectSchema).optional(),
      some: z.lazy(() => DialogWhereInputObjectSchema).optional(),
      none: z.lazy(() => DialogWhereInputObjectSchema).optional(),
    })
    .strict();
export const DialogListRelationFilterObjectSchema: z.ZodType<Prisma.DialogListRelationFilter> =
  __makeSchema_DialogListRelationFilter_schema() as unknown as z.ZodType<Prisma.DialogListRelationFilter>;
export const DialogListRelationFilterObjectZodSchema =
  __makeSchema_DialogListRelationFilter_schema();

// File: OAuthProviderOrderByCompositeAggregateInput.schema.ts
const __makeSchema_OAuthProviderOrderByCompositeAggregateInput_schema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const OAuthProviderOrderByCompositeAggregateInputObjectSchema: z.ZodType<Prisma.OAuthProviderOrderByCompositeAggregateInput> =
  __makeSchema_OAuthProviderOrderByCompositeAggregateInput_schema() as unknown as z.ZodType<Prisma.OAuthProviderOrderByCompositeAggregateInput>;
export const OAuthProviderOrderByCompositeAggregateInputObjectZodSchema =
  __makeSchema_OAuthProviderOrderByCompositeAggregateInput_schema();

// File: ApplicationOrderByRelationAggregateInput.schema.ts
const __makeSchema_ApplicationOrderByRelationAggregateInput_schema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const ApplicationOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationOrderByRelationAggregateInput> =
  __makeSchema_ApplicationOrderByRelationAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationOrderByRelationAggregateInput>;
export const ApplicationOrderByRelationAggregateInputObjectZodSchema =
  __makeSchema_ApplicationOrderByRelationAggregateInput_schema();

// File: UserApplicationOrderByRelationAggregateInput.schema.ts
const __makeSchema_UserApplicationOrderByRelationAggregateInput_schema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const UserApplicationOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.UserApplicationOrderByRelationAggregateInput> =
  __makeSchema_UserApplicationOrderByRelationAggregateInput_schema() as unknown as z.ZodType<Prisma.UserApplicationOrderByRelationAggregateInput>;
export const UserApplicationOrderByRelationAggregateInputObjectZodSchema =
  __makeSchema_UserApplicationOrderByRelationAggregateInput_schema();

// File: ApiKeyOrderByRelationAggregateInput.schema.ts
const __makeSchema_ApiKeyOrderByRelationAggregateInput_schema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const ApiKeyOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ApiKeyOrderByRelationAggregateInput> =
  __makeSchema_ApiKeyOrderByRelationAggregateInput_schema() as unknown as z.ZodType<Prisma.ApiKeyOrderByRelationAggregateInput>;
export const ApiKeyOrderByRelationAggregateInputObjectZodSchema =
  __makeSchema_ApiKeyOrderByRelationAggregateInput_schema();

// File: DialogOrderByRelationAggregateInput.schema.ts
const __makeSchema_DialogOrderByRelationAggregateInput_schema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const DialogOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.DialogOrderByRelationAggregateInput> =
  __makeSchema_DialogOrderByRelationAggregateInput_schema() as unknown as z.ZodType<Prisma.DialogOrderByRelationAggregateInput>;
export const DialogOrderByRelationAggregateInputObjectZodSchema =
  __makeSchema_DialogOrderByRelationAggregateInput_schema();

// File: UserCountOrderByAggregateInput.schema.ts
const __makeSchema_UserCountOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      password: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      resetPasswordToken: SortOrderSchema.optional(),
      resetPasswordExpires: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const UserCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  __makeSchema_UserCountOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.UserCountOrderByAggregateInput>;
export const UserCountOrderByAggregateInputObjectZodSchema =
  __makeSchema_UserCountOrderByAggregateInput_schema();

// File: UserMaxOrderByAggregateInput.schema.ts
const __makeSchema_UserMaxOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      password: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      resetPasswordToken: SortOrderSchema.optional(),
      resetPasswordExpires: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const UserMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  __makeSchema_UserMaxOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;
export const UserMaxOrderByAggregateInputObjectZodSchema =
  __makeSchema_UserMaxOrderByAggregateInput_schema();

// File: UserMinOrderByAggregateInput.schema.ts
const __makeSchema_UserMinOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      password: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      resetPasswordToken: SortOrderSchema.optional(),
      resetPasswordExpires: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const UserMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  __makeSchema_UserMinOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.UserMinOrderByAggregateInput>;
export const UserMinOrderByAggregateInputObjectZodSchema =
  __makeSchema_UserMinOrderByAggregateInput_schema();

// File: StringWithAggregatesFilter.schema.ts
const __makeSchema_StringWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: QueryModeSchema.optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterObjectSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedStringFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedStringFilterObjectSchema).optional(),
    })
    .strict();
export const StringWithAggregatesFilterObjectSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  __makeSchema_StringWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.StringWithAggregatesFilter>;
export const StringWithAggregatesFilterObjectZodSchema =
  __makeSchema_StringWithAggregatesFilter_schema();

// File: StringNullableWithAggregatesFilter.schema.ts
const __makeSchema_StringNullableWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: QueryModeSchema.optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterObjectSchema)])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterObjectSchema).optional(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const StringNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  __makeSchema_StringNullableWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.StringNullableWithAggregatesFilter>;
export const StringNullableWithAggregatesFilterObjectZodSchema =
  __makeSchema_StringNullableWithAggregatesFilter_schema();

// File: DateTimeNullableWithAggregatesFilter.schema.ts
const __makeSchema_DateTimeNullableWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      in: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
      notIn: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
      lt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      lte: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      gt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      gte: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      not: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterObjectSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const DateTimeNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  __makeSchema_DateTimeNullableWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter>;
export const DateTimeNullableWithAggregatesFilterObjectZodSchema =
  __makeSchema_DateTimeNullableWithAggregatesFilter_schema();

// File: DateTimeWithAggregatesFilter.schema.ts
const __makeSchema_DateTimeWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      in: z.union([z.date().array(), z.string().datetime().array()]).optional(),
      notIn: z.union([z.date().array(), z.string().datetime().array()]).optional(),
      lt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      lte: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      gt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      gte: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      not: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NestedDateTimeWithAggregatesFilterObjectSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
    })
    .strict();
export const DateTimeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  __makeSchema_DateTimeWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.DateTimeWithAggregatesFilter>;
export const DateTimeWithAggregatesFilterObjectZodSchema =
  __makeSchema_DateTimeWithAggregatesFilter_schema();

// File: EnumApplicationTypeFilter.schema.ts
const __makeSchema_EnumApplicationTypeFilter_schema = () =>
  z
    .object({
      equals: ApplicationTypeSchema.optional(),
      in: ApplicationTypeSchema.array().optional(),
      notIn: ApplicationTypeSchema.array().optional(),
      not: z
        .union([ApplicationTypeSchema, z.lazy(() => NestedEnumApplicationTypeFilterObjectSchema)])
        .optional(),
    })
    .strict();
export const EnumApplicationTypeFilterObjectSchema: z.ZodType<Prisma.EnumApplicationTypeFilter> =
  __makeSchema_EnumApplicationTypeFilter_schema() as unknown as z.ZodType<Prisma.EnumApplicationTypeFilter>;
export const EnumApplicationTypeFilterObjectZodSchema =
  __makeSchema_EnumApplicationTypeFilter_schema();

// File: EnumApplicationStatusFilter.schema.ts
const __makeSchema_EnumApplicationStatusFilter_schema = () =>
  z
    .object({
      equals: ApplicationStatusSchema.optional(),
      in: ApplicationStatusSchema.array().optional(),
      notIn: ApplicationStatusSchema.array().optional(),
      not: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const EnumApplicationStatusFilterObjectSchema: z.ZodType<Prisma.EnumApplicationStatusFilter> =
  __makeSchema_EnumApplicationStatusFilter_schema() as unknown as z.ZodType<Prisma.EnumApplicationStatusFilter>;
export const EnumApplicationStatusFilterObjectZodSchema =
  __makeSchema_EnumApplicationStatusFilter_schema();

// File: BoolFilter.schema.ts
const __makeSchema_BoolFilter_schema = () =>
  z
    .object({
      equals: z.boolean().optional(),
      not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterObjectSchema)]).optional(),
    })
    .strict();
export const BoolFilterObjectSchema: z.ZodType<Prisma.BoolFilter> =
  __makeSchema_BoolFilter_schema() as unknown as z.ZodType<Prisma.BoolFilter>;
export const BoolFilterObjectZodSchema = __makeSchema_BoolFilter_schema();

// File: ApplicationEntryPointsNullableCompositeFilter.schema.ts
const __makeSchema_ApplicationEntryPointsNullableCompositeFilter_schema = () =>
  z
    .object({
      equals: z
        .lazy(() => ApplicationEntryPointsObjectEqualityInputObjectSchema)
        .optional()
        .nullable(),
      is: z
        .lazy(() => ApplicationEntryPointsWhereInputObjectSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => ApplicationEntryPointsWhereInputObjectSchema)
        .optional()
        .nullable(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const ApplicationEntryPointsNullableCompositeFilterObjectSchema: z.ZodType<Prisma.ApplicationEntryPointsNullableCompositeFilter> =
  __makeSchema_ApplicationEntryPointsNullableCompositeFilter_schema() as unknown as z.ZodType<Prisma.ApplicationEntryPointsNullableCompositeFilter>;
export const ApplicationEntryPointsNullableCompositeFilterObjectZodSchema =
  __makeSchema_ApplicationEntryPointsNullableCompositeFilter_schema();

// File: ApplicationEntryPointsObjectEqualityInput.schema.ts
const __makeSchema_ApplicationEntryPointsObjectEqualityInput_schema = () =>
  z
    .object({
      frontend: z.string().optional().nullable(),
      backend: z.string().optional().nullable(),
    })
    .strict();
export const ApplicationEntryPointsObjectEqualityInputObjectSchema: z.ZodType<Prisma.ApplicationEntryPointsObjectEqualityInput> =
  __makeSchema_ApplicationEntryPointsObjectEqualityInput_schema() as unknown as z.ZodType<Prisma.ApplicationEntryPointsObjectEqualityInput>;
export const ApplicationEntryPointsObjectEqualityInputObjectZodSchema =
  __makeSchema_ApplicationEntryPointsObjectEqualityInput_schema();

// File: StringNullableListFilter.schema.ts
const __makeSchema_StringNullableListFilter_schema = () =>
  z
    .object({
      equals: z.string().array().optional().nullable(),
      has: z.string().optional().nullable(),
      hasEvery: z.string().array().optional(),
      hasSome: z.string().array().optional(),
      isEmpty: z.boolean().optional(),
    })
    .strict();
export const StringNullableListFilterObjectSchema: z.ZodType<Prisma.StringNullableListFilter> =
  __makeSchema_StringNullableListFilter_schema() as unknown as z.ZodType<Prisma.StringNullableListFilter>;
export const StringNullableListFilterObjectZodSchema =
  __makeSchema_StringNullableListFilter_schema();

// File: ApplicationStorageMetaNullableCompositeFilter.schema.ts
const __makeSchema_ApplicationStorageMetaNullableCompositeFilter_schema = () =>
  z
    .object({
      equals: z
        .lazy(() => ApplicationStorageMetaObjectEqualityInputObjectSchema)
        .optional()
        .nullable(),
      is: z
        .lazy(() => ApplicationStorageMetaWhereInputObjectSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => ApplicationStorageMetaWhereInputObjectSchema)
        .optional()
        .nullable(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const ApplicationStorageMetaNullableCompositeFilterObjectSchema: z.ZodType<Prisma.ApplicationStorageMetaNullableCompositeFilter> =
  __makeSchema_ApplicationStorageMetaNullableCompositeFilter_schema() as unknown as z.ZodType<Prisma.ApplicationStorageMetaNullableCompositeFilter>;
export const ApplicationStorageMetaNullableCompositeFilterObjectZodSchema =
  __makeSchema_ApplicationStorageMetaNullableCompositeFilter_schema();

// File: ApplicationStorageMetaObjectEqualityInput.schema.ts
const __makeSchema_ApplicationStorageMetaObjectEqualityInput_schema = () =>
  z
    .object({
      rootDir: z.string().optional().nullable(),
      archivePath: z.string().optional().nullable(),
      contentPath: z.string().optional().nullable(),
      manifestPath: z.string().optional().nullable(),
    })
    .strict();
export const ApplicationStorageMetaObjectEqualityInputObjectSchema: z.ZodType<Prisma.ApplicationStorageMetaObjectEqualityInput> =
  __makeSchema_ApplicationStorageMetaObjectEqualityInput_schema() as unknown as z.ZodType<Prisma.ApplicationStorageMetaObjectEqualityInput>;
export const ApplicationStorageMetaObjectEqualityInputObjectZodSchema =
  __makeSchema_ApplicationStorageMetaObjectEqualityInput_schema();

// File: JsonNullableFilter.schema.ts
const __makeSchema_JsonNullableFilter_schema = () =>
  z
    .object({
      equals: jsonSchema.optional().nullable(),
      not: jsonSchema.optional().nullable(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const JsonNullableFilterObjectSchema: z.ZodType<Prisma.JsonNullableFilter> =
  __makeSchema_JsonNullableFilter_schema() as unknown as z.ZodType<Prisma.JsonNullableFilter>;
export const JsonNullableFilterObjectZodSchema = __makeSchema_JsonNullableFilter_schema();

// File: UserNullableScalarRelationFilter.schema.ts
const __makeSchema_UserNullableScalarRelationFilter_schema = () =>
  z
    .object({
      is: z
        .lazy(() => UserWhereInputObjectSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => UserWhereInputObjectSchema)
        .optional()
        .nullable(),
    })
    .strict();
export const UserNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> =
  __makeSchema_UserNullableScalarRelationFilter_schema() as unknown as z.ZodType<Prisma.UserNullableScalarRelationFilter>;
export const UserNullableScalarRelationFilterObjectZodSchema =
  __makeSchema_UserNullableScalarRelationFilter_schema();

// File: ApplicationVersionListRelationFilter.schema.ts
const __makeSchema_ApplicationVersionListRelationFilter_schema = () =>
  z
    .object({
      every: z.lazy(() => ApplicationVersionWhereInputObjectSchema).optional(),
      some: z.lazy(() => ApplicationVersionWhereInputObjectSchema).optional(),
      none: z.lazy(() => ApplicationVersionWhereInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationVersionListRelationFilterObjectSchema: z.ZodType<Prisma.ApplicationVersionListRelationFilter> =
  __makeSchema_ApplicationVersionListRelationFilter_schema() as unknown as z.ZodType<Prisma.ApplicationVersionListRelationFilter>;
export const ApplicationVersionListRelationFilterObjectZodSchema =
  __makeSchema_ApplicationVersionListRelationFilter_schema();

// File: ApplicationEntryPointsOrderByInput.schema.ts
const __makeSchema_ApplicationEntryPointsOrderByInput_schema = () =>
  z
    .object({
      frontend: SortOrderSchema.optional(),
      backend: SortOrderSchema.optional(),
    })
    .strict();
export const ApplicationEntryPointsOrderByInputObjectSchema: z.ZodType<Prisma.ApplicationEntryPointsOrderByInput> =
  __makeSchema_ApplicationEntryPointsOrderByInput_schema() as unknown as z.ZodType<Prisma.ApplicationEntryPointsOrderByInput>;
export const ApplicationEntryPointsOrderByInputObjectZodSchema =
  __makeSchema_ApplicationEntryPointsOrderByInput_schema();

// File: ApplicationStorageMetaOrderByInput.schema.ts
const __makeSchema_ApplicationStorageMetaOrderByInput_schema = () =>
  z
    .object({
      rootDir: SortOrderSchema.optional(),
      archivePath: SortOrderSchema.optional(),
      contentPath: SortOrderSchema.optional(),
      manifestPath: SortOrderSchema.optional(),
    })
    .strict();
export const ApplicationStorageMetaOrderByInputObjectSchema: z.ZodType<Prisma.ApplicationStorageMetaOrderByInput> =
  __makeSchema_ApplicationStorageMetaOrderByInput_schema() as unknown as z.ZodType<Prisma.ApplicationStorageMetaOrderByInput>;
export const ApplicationStorageMetaOrderByInputObjectZodSchema =
  __makeSchema_ApplicationStorageMetaOrderByInput_schema();

// File: ApplicationVersionOrderByRelationAggregateInput.schema.ts
const __makeSchema_ApplicationVersionOrderByRelationAggregateInput_schema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const ApplicationVersionOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationVersionOrderByRelationAggregateInput> =
  __makeSchema_ApplicationVersionOrderByRelationAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionOrderByRelationAggregateInput>;
export const ApplicationVersionOrderByRelationAggregateInputObjectZodSchema =
  __makeSchema_ApplicationVersionOrderByRelationAggregateInput_schema();

// File: ApplicationCountOrderByAggregateInput.schema.ts
const __makeSchema_ApplicationCountOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      key: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      version: SortOrderSchema.optional(),
      type: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      isPublished: SortOrderSchema.optional(),
      ownerId: SortOrderSchema.optional(),
      permissions: SortOrderSchema.optional(),
      manifest: SortOrderSchema.optional(),
      icon: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const ApplicationCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationCountOrderByAggregateInput> =
  __makeSchema_ApplicationCountOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationCountOrderByAggregateInput>;
export const ApplicationCountOrderByAggregateInputObjectZodSchema =
  __makeSchema_ApplicationCountOrderByAggregateInput_schema();

// File: ApplicationMaxOrderByAggregateInput.schema.ts
const __makeSchema_ApplicationMaxOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      key: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      version: SortOrderSchema.optional(),
      type: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      isPublished: SortOrderSchema.optional(),
      ownerId: SortOrderSchema.optional(),
      icon: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const ApplicationMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationMaxOrderByAggregateInput> =
  __makeSchema_ApplicationMaxOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationMaxOrderByAggregateInput>;
export const ApplicationMaxOrderByAggregateInputObjectZodSchema =
  __makeSchema_ApplicationMaxOrderByAggregateInput_schema();

// File: ApplicationMinOrderByAggregateInput.schema.ts
const __makeSchema_ApplicationMinOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      key: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      version: SortOrderSchema.optional(),
      type: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      isPublished: SortOrderSchema.optional(),
      ownerId: SortOrderSchema.optional(),
      icon: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const ApplicationMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationMinOrderByAggregateInput> =
  __makeSchema_ApplicationMinOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationMinOrderByAggregateInput>;
export const ApplicationMinOrderByAggregateInputObjectZodSchema =
  __makeSchema_ApplicationMinOrderByAggregateInput_schema();

// File: EnumApplicationTypeWithAggregatesFilter.schema.ts
const __makeSchema_EnumApplicationTypeWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: ApplicationTypeSchema.optional(),
      in: ApplicationTypeSchema.array().optional(),
      notIn: ApplicationTypeSchema.array().optional(),
      not: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => NestedEnumApplicationTypeWithAggregatesFilterObjectSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedEnumApplicationTypeFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedEnumApplicationTypeFilterObjectSchema).optional(),
    })
    .strict();
export const EnumApplicationTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumApplicationTypeWithAggregatesFilter> =
  __makeSchema_EnumApplicationTypeWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.EnumApplicationTypeWithAggregatesFilter>;
export const EnumApplicationTypeWithAggregatesFilterObjectZodSchema =
  __makeSchema_EnumApplicationTypeWithAggregatesFilter_schema();

// File: EnumApplicationStatusWithAggregatesFilter.schema.ts
const __makeSchema_EnumApplicationStatusWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: ApplicationStatusSchema.optional(),
      in: ApplicationStatusSchema.array().optional(),
      notIn: ApplicationStatusSchema.array().optional(),
      not: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => NestedEnumApplicationStatusWithAggregatesFilterObjectSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema).optional(),
    })
    .strict();
export const EnumApplicationStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumApplicationStatusWithAggregatesFilter> =
  __makeSchema_EnumApplicationStatusWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.EnumApplicationStatusWithAggregatesFilter>;
export const EnumApplicationStatusWithAggregatesFilterObjectZodSchema =
  __makeSchema_EnumApplicationStatusWithAggregatesFilter_schema();

// File: BoolWithAggregatesFilter.schema.ts
const __makeSchema_BoolWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterObjectSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterObjectSchema).optional(),
    })
    .strict();
export const BoolWithAggregatesFilterObjectSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  __makeSchema_BoolWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.BoolWithAggregatesFilter>;
export const BoolWithAggregatesFilterObjectZodSchema =
  __makeSchema_BoolWithAggregatesFilter_schema();

// File: JsonNullableWithAggregatesFilter.schema.ts
const __makeSchema_JsonNullableWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: jsonSchema.optional().nullable(),
      not: jsonSchema.optional().nullable(),
      _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedJsonNullableFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedJsonNullableFilterObjectSchema).optional(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const JsonNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> =
  __makeSchema_JsonNullableWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.JsonNullableWithAggregatesFilter>;
export const JsonNullableWithAggregatesFilterObjectZodSchema =
  __makeSchema_JsonNullableWithAggregatesFilter_schema();

// File: ApplicationScalarRelationFilter.schema.ts
const __makeSchema_ApplicationScalarRelationFilter_schema = () =>
  z
    .object({
      is: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationScalarRelationFilterObjectSchema: z.ZodType<Prisma.ApplicationScalarRelationFilter> =
  __makeSchema_ApplicationScalarRelationFilter_schema() as unknown as z.ZodType<Prisma.ApplicationScalarRelationFilter>;
export const ApplicationScalarRelationFilterObjectZodSchema =
  __makeSchema_ApplicationScalarRelationFilter_schema();

// File: ApplicationVersionApplicationIdVersionCompoundUniqueInput.schema.ts
const __makeSchema_ApplicationVersionApplicationIdVersionCompoundUniqueInput_schema = () =>
  z
    .object({
      applicationId: z.string(),
      version: z.string(),
    })
    .strict();
export const ApplicationVersionApplicationIdVersionCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ApplicationVersionApplicationIdVersionCompoundUniqueInput> =
  __makeSchema_ApplicationVersionApplicationIdVersionCompoundUniqueInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionApplicationIdVersionCompoundUniqueInput>;
export const ApplicationVersionApplicationIdVersionCompoundUniqueInputObjectZodSchema =
  __makeSchema_ApplicationVersionApplicationIdVersionCompoundUniqueInput_schema();

// File: ApplicationVersionCountOrderByAggregateInput.schema.ts
const __makeSchema_ApplicationVersionCountOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      applicationId: SortOrderSchema.optional(),
      version: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      releaseNotes: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      permissions: SortOrderSchema.optional(),
      manifest: SortOrderSchema.optional(),
    })
    .strict();
export const ApplicationVersionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationVersionCountOrderByAggregateInput> =
  __makeSchema_ApplicationVersionCountOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionCountOrderByAggregateInput>;
export const ApplicationVersionCountOrderByAggregateInputObjectZodSchema =
  __makeSchema_ApplicationVersionCountOrderByAggregateInput_schema();

// File: ApplicationVersionMaxOrderByAggregateInput.schema.ts
const __makeSchema_ApplicationVersionMaxOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      applicationId: SortOrderSchema.optional(),
      version: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      releaseNotes: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
    })
    .strict();
export const ApplicationVersionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationVersionMaxOrderByAggregateInput> =
  __makeSchema_ApplicationVersionMaxOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionMaxOrderByAggregateInput>;
export const ApplicationVersionMaxOrderByAggregateInputObjectZodSchema =
  __makeSchema_ApplicationVersionMaxOrderByAggregateInput_schema();

// File: ApplicationVersionMinOrderByAggregateInput.schema.ts
const __makeSchema_ApplicationVersionMinOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      applicationId: SortOrderSchema.optional(),
      version: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      releaseNotes: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
    })
    .strict();
export const ApplicationVersionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationVersionMinOrderByAggregateInput> =
  __makeSchema_ApplicationVersionMinOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionMinOrderByAggregateInput>;
export const ApplicationVersionMinOrderByAggregateInputObjectZodSchema =
  __makeSchema_ApplicationVersionMinOrderByAggregateInput_schema();

// File: UserScalarRelationFilter.schema.ts
const __makeSchema_UserScalarRelationFilter_schema = () =>
  z
    .object({
      is: z.lazy(() => UserWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserScalarRelationFilterObjectSchema: z.ZodType<Prisma.UserScalarRelationFilter> =
  __makeSchema_UserScalarRelationFilter_schema() as unknown as z.ZodType<Prisma.UserScalarRelationFilter>;
export const UserScalarRelationFilterObjectZodSchema =
  __makeSchema_UserScalarRelationFilter_schema();

// File: UserApplicationUserIdApplicationIdCompoundUniqueInput.schema.ts
const __makeSchema_UserApplicationUserIdApplicationIdCompoundUniqueInput_schema = () =>
  z
    .object({
      userId: z.string(),
      applicationId: z.string(),
    })
    .strict();
export const UserApplicationUserIdApplicationIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UserApplicationUserIdApplicationIdCompoundUniqueInput> =
  __makeSchema_UserApplicationUserIdApplicationIdCompoundUniqueInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUserIdApplicationIdCompoundUniqueInput>;
export const UserApplicationUserIdApplicationIdCompoundUniqueInputObjectZodSchema =
  __makeSchema_UserApplicationUserIdApplicationIdCompoundUniqueInput_schema();

// File: UserApplicationCountOrderByAggregateInput.schema.ts
const __makeSchema_UserApplicationCountOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      applicationId: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const UserApplicationCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserApplicationCountOrderByAggregateInput> =
  __makeSchema_UserApplicationCountOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCountOrderByAggregateInput>;
export const UserApplicationCountOrderByAggregateInputObjectZodSchema =
  __makeSchema_UserApplicationCountOrderByAggregateInput_schema();

// File: UserApplicationMaxOrderByAggregateInput.schema.ts
const __makeSchema_UserApplicationMaxOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      applicationId: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const UserApplicationMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserApplicationMaxOrderByAggregateInput> =
  __makeSchema_UserApplicationMaxOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.UserApplicationMaxOrderByAggregateInput>;
export const UserApplicationMaxOrderByAggregateInputObjectZodSchema =
  __makeSchema_UserApplicationMaxOrderByAggregateInput_schema();

// File: UserApplicationMinOrderByAggregateInput.schema.ts
const __makeSchema_UserApplicationMinOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      applicationId: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const UserApplicationMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserApplicationMinOrderByAggregateInput> =
  __makeSchema_UserApplicationMinOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.UserApplicationMinOrderByAggregateInput>;
export const UserApplicationMinOrderByAggregateInputObjectZodSchema =
  __makeSchema_UserApplicationMinOrderByAggregateInput_schema();

// File: ApiKeyUserIdProviderCompoundUniqueInput.schema.ts
const __makeSchema_ApiKeyUserIdProviderCompoundUniqueInput_schema = () =>
  z
    .object({
      userId: z.string(),
      provider: z.string(),
    })
    .strict();
export const ApiKeyUserIdProviderCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ApiKeyUserIdProviderCompoundUniqueInput> =
  __makeSchema_ApiKeyUserIdProviderCompoundUniqueInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUserIdProviderCompoundUniqueInput>;
export const ApiKeyUserIdProviderCompoundUniqueInputObjectZodSchema =
  __makeSchema_ApiKeyUserIdProviderCompoundUniqueInput_schema();

// File: ApiKeyCountOrderByAggregateInput.schema.ts
const __makeSchema_ApiKeyCountOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      provider: SortOrderSchema.optional(),
      encryptedKey: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const ApiKeyCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApiKeyCountOrderByAggregateInput> =
  __makeSchema_ApiKeyCountOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.ApiKeyCountOrderByAggregateInput>;
export const ApiKeyCountOrderByAggregateInputObjectZodSchema =
  __makeSchema_ApiKeyCountOrderByAggregateInput_schema();

// File: ApiKeyMaxOrderByAggregateInput.schema.ts
const __makeSchema_ApiKeyMaxOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      provider: SortOrderSchema.optional(),
      encryptedKey: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const ApiKeyMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApiKeyMaxOrderByAggregateInput> =
  __makeSchema_ApiKeyMaxOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.ApiKeyMaxOrderByAggregateInput>;
export const ApiKeyMaxOrderByAggregateInputObjectZodSchema =
  __makeSchema_ApiKeyMaxOrderByAggregateInput_schema();

// File: ApiKeyMinOrderByAggregateInput.schema.ts
const __makeSchema_ApiKeyMinOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      provider: SortOrderSchema.optional(),
      encryptedKey: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const ApiKeyMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApiKeyMinOrderByAggregateInput> =
  __makeSchema_ApiKeyMinOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.ApiKeyMinOrderByAggregateInput>;
export const ApiKeyMinOrderByAggregateInputObjectZodSchema =
  __makeSchema_ApiKeyMinOrderByAggregateInput_schema();

// File: IntFilter.schema.ts
const __makeSchema_IntFilter_schema = () =>
  z
    .object({
      equals: z.number().int().optional(),
      in: z.number().int().array().optional(),
      notIn: z.number().int().array().optional(),
      lt: z.number().int().optional(),
      lte: z.number().int().optional(),
      gt: z.number().int().optional(),
      gte: z.number().int().optional(),
      not: z.union([z.number().int(), z.lazy(() => NestedIntFilterObjectSchema)]).optional(),
    })
    .strict();
export const IntFilterObjectSchema: z.ZodType<Prisma.IntFilter> =
  __makeSchema_IntFilter_schema() as unknown as z.ZodType<Prisma.IntFilter>;
export const IntFilterObjectZodSchema = __makeSchema_IntFilter_schema();

// File: EnumLanguageFilter.schema.ts
const __makeSchema_EnumLanguageFilter_schema = () =>
  z
    .object({
      equals: LanguageSchema.optional(),
      in: LanguageSchema.array().optional(),
      notIn: LanguageSchema.array().optional(),
      not: z.union([LanguageSchema, z.lazy(() => NestedEnumLanguageFilterObjectSchema)]).optional(),
    })
    .strict();
export const EnumLanguageFilterObjectSchema: z.ZodType<Prisma.EnumLanguageFilter> =
  __makeSchema_EnumLanguageFilter_schema() as unknown as z.ZodType<Prisma.EnumLanguageFilter>;
export const EnumLanguageFilterObjectZodSchema = __makeSchema_EnumLanguageFilter_schema();

// File: EnumThemeFilter.schema.ts
const __makeSchema_EnumThemeFilter_schema = () =>
  z
    .object({
      equals: ThemeSchema.optional(),
      in: ThemeSchema.array().optional(),
      notIn: ThemeSchema.array().optional(),
      not: z.union([ThemeSchema, z.lazy(() => NestedEnumThemeFilterObjectSchema)]).optional(),
    })
    .strict();
export const EnumThemeFilterObjectSchema: z.ZodType<Prisma.EnumThemeFilter> =
  __makeSchema_EnumThemeFilter_schema() as unknown as z.ZodType<Prisma.EnumThemeFilter>;
export const EnumThemeFilterObjectZodSchema = __makeSchema_EnumThemeFilter_schema();

// File: EnumIdleModeFilter.schema.ts
const __makeSchema_EnumIdleModeFilter_schema = () =>
  z
    .object({
      equals: IdleModeSchema.optional(),
      in: IdleModeSchema.array().optional(),
      notIn: IdleModeSchema.array().optional(),
      not: z.union([IdleModeSchema, z.lazy(() => NestedEnumIdleModeFilterObjectSchema)]).optional(),
    })
    .strict();
export const EnumIdleModeFilterObjectSchema: z.ZodType<Prisma.EnumIdleModeFilter> =
  __makeSchema_EnumIdleModeFilter_schema() as unknown as z.ZodType<Prisma.EnumIdleModeFilter>;
export const EnumIdleModeFilterObjectZodSchema = __makeSchema_EnumIdleModeFilter_schema();

// File: ModelSceneSettingsNullableCompositeFilter.schema.ts
const __makeSchema_ModelSceneSettingsNullableCompositeFilter_schema = () =>
  z
    .object({
      equals: z
        .lazy(() => ModelSceneSettingsObjectEqualityInputObjectSchema)
        .optional()
        .nullable(),
      is: z
        .lazy(() => ModelSceneSettingsWhereInputObjectSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => ModelSceneSettingsWhereInputObjectSchema)
        .optional()
        .nullable(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const ModelSceneSettingsNullableCompositeFilterObjectSchema: z.ZodType<Prisma.ModelSceneSettingsNullableCompositeFilter> =
  __makeSchema_ModelSceneSettingsNullableCompositeFilter_schema() as unknown as z.ZodType<Prisma.ModelSceneSettingsNullableCompositeFilter>;
export const ModelSceneSettingsNullableCompositeFilterObjectZodSchema =
  __makeSchema_ModelSceneSettingsNullableCompositeFilter_schema();

// File: ModelSceneSettingsObjectEqualityInput.schema.ts
const __makeSchema_ModelSceneSettingsObjectEqualityInput_schema = () =>
  z
    .object({
      modelPath: z.string().optional().nullable(),
      sceneName: z.string().optional().nullable(),
      enableToonShader: z.boolean().optional().nullable(),
      lightIntensity: z.number().optional().nullable(),
      cameraDistance: z.number().optional().nullable(),
      animationSpeed: z.number().optional().nullable(),
    })
    .strict();
export const ModelSceneSettingsObjectEqualityInputObjectSchema: z.ZodType<Prisma.ModelSceneSettingsObjectEqualityInput> =
  __makeSchema_ModelSceneSettingsObjectEqualityInput_schema() as unknown as z.ZodType<Prisma.ModelSceneSettingsObjectEqualityInput>;
export const ModelSceneSettingsObjectEqualityInputObjectZodSchema =
  __makeSchema_ModelSceneSettingsObjectEqualityInput_schema();

// File: ModelSceneSettingsOrderByInput.schema.ts
const __makeSchema_ModelSceneSettingsOrderByInput_schema = () =>
  z
    .object({
      modelPath: SortOrderSchema.optional(),
      sceneName: SortOrderSchema.optional(),
      enableToonShader: SortOrderSchema.optional(),
      lightIntensity: SortOrderSchema.optional(),
      cameraDistance: SortOrderSchema.optional(),
      animationSpeed: SortOrderSchema.optional(),
    })
    .strict();
export const ModelSceneSettingsOrderByInputObjectSchema: z.ZodType<Prisma.ModelSceneSettingsOrderByInput> =
  __makeSchema_ModelSceneSettingsOrderByInput_schema() as unknown as z.ZodType<Prisma.ModelSceneSettingsOrderByInput>;
export const ModelSceneSettingsOrderByInputObjectZodSchema =
  __makeSchema_ModelSceneSettingsOrderByInput_schema();

// File: SettingsCountOrderByAggregateInput.schema.ts
const __makeSchema_SettingsCountOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      volume: SortOrderSchema.optional(),
      language: SortOrderSchema.optional(),
      theme: SortOrderSchema.optional(),
      accentColorLight: SortOrderSchema.optional(),
      accentColorDark: SortOrderSchema.optional(),
      sttProviderName: SortOrderSchema.optional(),
      llmProviderName: SortOrderSchema.optional(),
      llmModel: SortOrderSchema.optional(),
      ttsProviderName: SortOrderSchema.optional(),
      welcomeTitle: SortOrderSchema.optional(),
      idleTimeoutSeconds: SortOrderSchema.optional(),
      idleMode: SortOrderSchema.optional(),
      idleCustomImagePath: SortOrderSchema.optional(),
      idleRemoteEndpoint: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const SettingsCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SettingsCountOrderByAggregateInput> =
  __makeSchema_SettingsCountOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.SettingsCountOrderByAggregateInput>;
export const SettingsCountOrderByAggregateInputObjectZodSchema =
  __makeSchema_SettingsCountOrderByAggregateInput_schema();

// File: SettingsAvgOrderByAggregateInput.schema.ts
const __makeSchema_SettingsAvgOrderByAggregateInput_schema = () =>
  z
    .object({
      volume: SortOrderSchema.optional(),
      idleTimeoutSeconds: SortOrderSchema.optional(),
    })
    .strict();
export const SettingsAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SettingsAvgOrderByAggregateInput> =
  __makeSchema_SettingsAvgOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.SettingsAvgOrderByAggregateInput>;
export const SettingsAvgOrderByAggregateInputObjectZodSchema =
  __makeSchema_SettingsAvgOrderByAggregateInput_schema();

// File: SettingsMaxOrderByAggregateInput.schema.ts
const __makeSchema_SettingsMaxOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      volume: SortOrderSchema.optional(),
      language: SortOrderSchema.optional(),
      theme: SortOrderSchema.optional(),
      accentColorLight: SortOrderSchema.optional(),
      accentColorDark: SortOrderSchema.optional(),
      sttProviderName: SortOrderSchema.optional(),
      llmProviderName: SortOrderSchema.optional(),
      llmModel: SortOrderSchema.optional(),
      ttsProviderName: SortOrderSchema.optional(),
      welcomeTitle: SortOrderSchema.optional(),
      idleTimeoutSeconds: SortOrderSchema.optional(),
      idleMode: SortOrderSchema.optional(),
      idleCustomImagePath: SortOrderSchema.optional(),
      idleRemoteEndpoint: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const SettingsMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SettingsMaxOrderByAggregateInput> =
  __makeSchema_SettingsMaxOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.SettingsMaxOrderByAggregateInput>;
export const SettingsMaxOrderByAggregateInputObjectZodSchema =
  __makeSchema_SettingsMaxOrderByAggregateInput_schema();

// File: SettingsMinOrderByAggregateInput.schema.ts
const __makeSchema_SettingsMinOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      volume: SortOrderSchema.optional(),
      language: SortOrderSchema.optional(),
      theme: SortOrderSchema.optional(),
      accentColorLight: SortOrderSchema.optional(),
      accentColorDark: SortOrderSchema.optional(),
      sttProviderName: SortOrderSchema.optional(),
      llmProviderName: SortOrderSchema.optional(),
      llmModel: SortOrderSchema.optional(),
      ttsProviderName: SortOrderSchema.optional(),
      welcomeTitle: SortOrderSchema.optional(),
      idleTimeoutSeconds: SortOrderSchema.optional(),
      idleMode: SortOrderSchema.optional(),
      idleCustomImagePath: SortOrderSchema.optional(),
      idleRemoteEndpoint: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const SettingsMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SettingsMinOrderByAggregateInput> =
  __makeSchema_SettingsMinOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.SettingsMinOrderByAggregateInput>;
export const SettingsMinOrderByAggregateInputObjectZodSchema =
  __makeSchema_SettingsMinOrderByAggregateInput_schema();

// File: SettingsSumOrderByAggregateInput.schema.ts
const __makeSchema_SettingsSumOrderByAggregateInput_schema = () =>
  z
    .object({
      volume: SortOrderSchema.optional(),
      idleTimeoutSeconds: SortOrderSchema.optional(),
    })
    .strict();
export const SettingsSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SettingsSumOrderByAggregateInput> =
  __makeSchema_SettingsSumOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.SettingsSumOrderByAggregateInput>;
export const SettingsSumOrderByAggregateInputObjectZodSchema =
  __makeSchema_SettingsSumOrderByAggregateInput_schema();

// File: IntWithAggregatesFilter.schema.ts
const __makeSchema_IntWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: z.number().int().optional(),
      in: z.number().int().array().optional(),
      notIn: z.number().int().array().optional(),
      lt: z.number().int().optional(),
      lte: z.number().int().optional(),
      gt: z.number().int().optional(),
      gte: z.number().int().optional(),
      not: z
        .union([z.number().int(), z.lazy(() => NestedIntWithAggregatesFilterObjectSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterObjectSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    })
    .strict();
export const IntWithAggregatesFilterObjectSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  __makeSchema_IntWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.IntWithAggregatesFilter>;
export const IntWithAggregatesFilterObjectZodSchema = __makeSchema_IntWithAggregatesFilter_schema();

// File: EnumLanguageWithAggregatesFilter.schema.ts
const __makeSchema_EnumLanguageWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: LanguageSchema.optional(),
      in: LanguageSchema.array().optional(),
      notIn: LanguageSchema.array().optional(),
      not: z
        .union([LanguageSchema, z.lazy(() => NestedEnumLanguageWithAggregatesFilterObjectSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedEnumLanguageFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedEnumLanguageFilterObjectSchema).optional(),
    })
    .strict();
export const EnumLanguageWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumLanguageWithAggregatesFilter> =
  __makeSchema_EnumLanguageWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.EnumLanguageWithAggregatesFilter>;
export const EnumLanguageWithAggregatesFilterObjectZodSchema =
  __makeSchema_EnumLanguageWithAggregatesFilter_schema();

// File: EnumThemeWithAggregatesFilter.schema.ts
const __makeSchema_EnumThemeWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: ThemeSchema.optional(),
      in: ThemeSchema.array().optional(),
      notIn: ThemeSchema.array().optional(),
      not: z
        .union([ThemeSchema, z.lazy(() => NestedEnumThemeWithAggregatesFilterObjectSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedEnumThemeFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedEnumThemeFilterObjectSchema).optional(),
    })
    .strict();
export const EnumThemeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumThemeWithAggregatesFilter> =
  __makeSchema_EnumThemeWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.EnumThemeWithAggregatesFilter>;
export const EnumThemeWithAggregatesFilterObjectZodSchema =
  __makeSchema_EnumThemeWithAggregatesFilter_schema();

// File: EnumIdleModeWithAggregatesFilter.schema.ts
const __makeSchema_EnumIdleModeWithAggregatesFilter_schema = () =>
  z
    .object({
      equals: IdleModeSchema.optional(),
      in: IdleModeSchema.array().optional(),
      notIn: IdleModeSchema.array().optional(),
      not: z
        .union([IdleModeSchema, z.lazy(() => NestedEnumIdleModeWithAggregatesFilterObjectSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedEnumIdleModeFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedEnumIdleModeFilterObjectSchema).optional(),
    })
    .strict();
export const EnumIdleModeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumIdleModeWithAggregatesFilter> =
  __makeSchema_EnumIdleModeWithAggregatesFilter_schema() as unknown as z.ZodType<Prisma.EnumIdleModeWithAggregatesFilter>;
export const EnumIdleModeWithAggregatesFilterObjectZodSchema =
  __makeSchema_EnumIdleModeWithAggregatesFilter_schema();

// File: ChatMessageCompositeListFilter.schema.ts
const __makeSchema_ChatMessageCompositeListFilter_schema = () =>
  z
    .object({
      equals: z
        .lazy(() => ChatMessageObjectEqualityInputObjectSchema)
        .array()
        .optional(),
      every: z.lazy(() => ChatMessageWhereInputObjectSchema).optional(),
      some: z.lazy(() => ChatMessageWhereInputObjectSchema).optional(),
      none: z.lazy(() => ChatMessageWhereInputObjectSchema).optional(),
      isEmpty: z.boolean().optional(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const ChatMessageCompositeListFilterObjectSchema: z.ZodType<Prisma.ChatMessageCompositeListFilter> =
  __makeSchema_ChatMessageCompositeListFilter_schema() as unknown as z.ZodType<Prisma.ChatMessageCompositeListFilter>;
export const ChatMessageCompositeListFilterObjectZodSchema =
  __makeSchema_ChatMessageCompositeListFilter_schema();

// File: ChatMessageObjectEqualityInput.schema.ts
const __makeSchema_ChatMessageObjectEqualityInput_schema = () =>
  z
    .object({
      id: z.string(),
      position: MessagePositionSchema,
      type: z.string(),
      text: z.string(),
      date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v)),
    })
    .strict();
export const ChatMessageObjectEqualityInputObjectSchema: z.ZodType<Prisma.ChatMessageObjectEqualityInput> =
  __makeSchema_ChatMessageObjectEqualityInput_schema() as unknown as z.ZodType<Prisma.ChatMessageObjectEqualityInput>;
export const ChatMessageObjectEqualityInputObjectZodSchema =
  __makeSchema_ChatMessageObjectEqualityInput_schema();

// File: ChatMessageOrderByCompositeAggregateInput.schema.ts
const __makeSchema_ChatMessageOrderByCompositeAggregateInput_schema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const ChatMessageOrderByCompositeAggregateInputObjectSchema: z.ZodType<Prisma.ChatMessageOrderByCompositeAggregateInput> =
  __makeSchema_ChatMessageOrderByCompositeAggregateInput_schema() as unknown as z.ZodType<Prisma.ChatMessageOrderByCompositeAggregateInput>;
export const ChatMessageOrderByCompositeAggregateInputObjectZodSchema =
  __makeSchema_ChatMessageOrderByCompositeAggregateInput_schema();

// File: DialogUserIdDialogIdCompoundUniqueInput.schema.ts
const __makeSchema_DialogUserIdDialogIdCompoundUniqueInput_schema = () =>
  z
    .object({
      userId: z.string(),
      dialogId: z.string(),
    })
    .strict();
export const DialogUserIdDialogIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.DialogUserIdDialogIdCompoundUniqueInput> =
  __makeSchema_DialogUserIdDialogIdCompoundUniqueInput_schema() as unknown as z.ZodType<Prisma.DialogUserIdDialogIdCompoundUniqueInput>;
export const DialogUserIdDialogIdCompoundUniqueInputObjectZodSchema =
  __makeSchema_DialogUserIdDialogIdCompoundUniqueInput_schema();

// File: DialogCountOrderByAggregateInput.schema.ts
const __makeSchema_DialogCountOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      dialogId: SortOrderSchema.optional(),
      title: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const DialogCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DialogCountOrderByAggregateInput> =
  __makeSchema_DialogCountOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.DialogCountOrderByAggregateInput>;
export const DialogCountOrderByAggregateInputObjectZodSchema =
  __makeSchema_DialogCountOrderByAggregateInput_schema();

// File: DialogMaxOrderByAggregateInput.schema.ts
const __makeSchema_DialogMaxOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      dialogId: SortOrderSchema.optional(),
      title: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const DialogMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DialogMaxOrderByAggregateInput> =
  __makeSchema_DialogMaxOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.DialogMaxOrderByAggregateInput>;
export const DialogMaxOrderByAggregateInputObjectZodSchema =
  __makeSchema_DialogMaxOrderByAggregateInput_schema();

// File: DialogMinOrderByAggregateInput.schema.ts
const __makeSchema_DialogMinOrderByAggregateInput_schema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      dialogId: SortOrderSchema.optional(),
      title: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const DialogMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DialogMinOrderByAggregateInput> =
  __makeSchema_DialogMinOrderByAggregateInput_schema() as unknown as z.ZodType<Prisma.DialogMinOrderByAggregateInput>;
export const DialogMinOrderByAggregateInputObjectZodSchema =
  __makeSchema_DialogMinOrderByAggregateInput_schema();

// File: OAuthProviderListCreateEnvelopeInput.schema.ts
const __makeSchema_OAuthProviderListCreateEnvelopeInput_schema = () =>
  z
    .object({
      set: z
        .union([
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const OAuthProviderListCreateEnvelopeInputObjectSchema: z.ZodType<Prisma.OAuthProviderListCreateEnvelopeInput> =
  __makeSchema_OAuthProviderListCreateEnvelopeInput_schema() as unknown as z.ZodType<Prisma.OAuthProviderListCreateEnvelopeInput>;
export const OAuthProviderListCreateEnvelopeInputObjectZodSchema =
  __makeSchema_OAuthProviderListCreateEnvelopeInput_schema();

// File: OAuthProviderCreateInput.schema.ts
const __makeSchema_OAuthProviderCreateInput_schema = () =>
  z
    .object({
      provider: z.string(),
      providerId: z.string(),
    })
    .strict();
export const OAuthProviderCreateInputObjectSchema: z.ZodType<Prisma.OAuthProviderCreateInput> =
  __makeSchema_OAuthProviderCreateInput_schema() as unknown as z.ZodType<Prisma.OAuthProviderCreateInput>;
export const OAuthProviderCreateInputObjectZodSchema =
  __makeSchema_OAuthProviderCreateInput_schema();

// File: ApplicationCreateNestedManyWithoutOwnerInput.schema.ts
const __makeSchema_ApplicationCreateNestedManyWithoutOwnerInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationCreateWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationCreateWithoutOwnerInputObjectSchema).array(),
          z.lazy(() => ApplicationUncheckedCreateWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationUncheckedCreateWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApplicationCreateOrConnectWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationCreateOrConnectWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ApplicationCreateManyOwnerInputEnvelopeObjectSchema).optional(),
      connect: z
        .union([
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApplicationCreateNestedManyWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationCreateNestedManyWithoutOwnerInput> =
  __makeSchema_ApplicationCreateNestedManyWithoutOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateNestedManyWithoutOwnerInput>;
export const ApplicationCreateNestedManyWithoutOwnerInputObjectZodSchema =
  __makeSchema_ApplicationCreateNestedManyWithoutOwnerInput_schema();

// File: UserApplicationCreateNestedManyWithoutUserInput.schema.ts
const __makeSchema_UserApplicationCreateNestedManyWithoutUserInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserApplicationCreateWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => UserApplicationUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserApplicationCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => UserApplicationCreateManyUserInputEnvelopeObjectSchema).optional(),
      connect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.UserApplicationCreateNestedManyWithoutUserInput> =
  __makeSchema_UserApplicationCreateNestedManyWithoutUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateNestedManyWithoutUserInput>;
export const UserApplicationCreateNestedManyWithoutUserInputObjectZodSchema =
  __makeSchema_UserApplicationCreateNestedManyWithoutUserInput_schema();

// File: ApiKeyCreateNestedManyWithoutUserInput.schema.ts
const __makeSchema_ApiKeyCreateNestedManyWithoutUserInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApiKeyCreateWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => ApiKeyUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApiKeyCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ApiKeyCreateManyUserInputEnvelopeObjectSchema).optional(),
      connect: z
        .union([
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApiKeyCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ApiKeyCreateNestedManyWithoutUserInput> =
  __makeSchema_ApiKeyCreateNestedManyWithoutUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyCreateNestedManyWithoutUserInput>;
export const ApiKeyCreateNestedManyWithoutUserInputObjectZodSchema =
  __makeSchema_ApiKeyCreateNestedManyWithoutUserInput_schema();

// File: SettingsCreateNestedOneWithoutUserInput.schema.ts
const __makeSchema_SettingsCreateNestedOneWithoutUserInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => SettingsCreateWithoutUserInputObjectSchema),
          z.lazy(() => SettingsUncheckedCreateWithoutUserInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => SettingsCreateOrConnectWithoutUserInputObjectSchema).optional(),
      connect: z.lazy(() => SettingsWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const SettingsCreateNestedOneWithoutUserInputObjectSchema: z.ZodType<Prisma.SettingsCreateNestedOneWithoutUserInput> =
  __makeSchema_SettingsCreateNestedOneWithoutUserInput_schema() as unknown as z.ZodType<Prisma.SettingsCreateNestedOneWithoutUserInput>;
export const SettingsCreateNestedOneWithoutUserInputObjectZodSchema =
  __makeSchema_SettingsCreateNestedOneWithoutUserInput_schema();

// File: DialogCreateNestedManyWithoutUserInput.schema.ts
const __makeSchema_DialogCreateNestedManyWithoutUserInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => DialogCreateWithoutUserInputObjectSchema),
          z.lazy(() => DialogCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => DialogUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => DialogUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DialogCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => DialogCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => DialogCreateManyUserInputEnvelopeObjectSchema).optional(),
      connect: z
        .union([
          z.lazy(() => DialogWhereUniqueInputObjectSchema),
          z.lazy(() => DialogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const DialogCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.DialogCreateNestedManyWithoutUserInput> =
  __makeSchema_DialogCreateNestedManyWithoutUserInput_schema() as unknown as z.ZodType<Prisma.DialogCreateNestedManyWithoutUserInput>;
export const DialogCreateNestedManyWithoutUserInputObjectZodSchema =
  __makeSchema_DialogCreateNestedManyWithoutUserInput_schema();

// File: ApplicationUncheckedCreateNestedManyWithoutOwnerInput.schema.ts
const __makeSchema_ApplicationUncheckedCreateNestedManyWithoutOwnerInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationCreateWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationCreateWithoutOwnerInputObjectSchema).array(),
          z.lazy(() => ApplicationUncheckedCreateWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationUncheckedCreateWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApplicationCreateOrConnectWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationCreateOrConnectWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ApplicationCreateManyOwnerInputEnvelopeObjectSchema).optional(),
      connect: z
        .union([
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApplicationUncheckedCreateNestedManyWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedCreateNestedManyWithoutOwnerInput> =
  __makeSchema_ApplicationUncheckedCreateNestedManyWithoutOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedCreateNestedManyWithoutOwnerInput>;
export const ApplicationUncheckedCreateNestedManyWithoutOwnerInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedCreateNestedManyWithoutOwnerInput_schema();

// File: UserApplicationUncheckedCreateNestedManyWithoutUserInput.schema.ts
const __makeSchema_UserApplicationUncheckedCreateNestedManyWithoutUserInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserApplicationCreateWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => UserApplicationUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserApplicationCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => UserApplicationCreateManyUserInputEnvelopeObjectSchema).optional(),
      connect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedCreateNestedManyWithoutUserInput> =
  __makeSchema_UserApplicationUncheckedCreateNestedManyWithoutUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedCreateNestedManyWithoutUserInput>;
export const UserApplicationUncheckedCreateNestedManyWithoutUserInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedCreateNestedManyWithoutUserInput_schema();

// File: ApiKeyUncheckedCreateNestedManyWithoutUserInput.schema.ts
const __makeSchema_ApiKeyUncheckedCreateNestedManyWithoutUserInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApiKeyCreateWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => ApiKeyUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApiKeyCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ApiKeyCreateManyUserInputEnvelopeObjectSchema).optional(),
      connect: z
        .union([
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApiKeyUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ApiKeyUncheckedCreateNestedManyWithoutUserInput> =
  __makeSchema_ApiKeyUncheckedCreateNestedManyWithoutUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUncheckedCreateNestedManyWithoutUserInput>;
export const ApiKeyUncheckedCreateNestedManyWithoutUserInputObjectZodSchema =
  __makeSchema_ApiKeyUncheckedCreateNestedManyWithoutUserInput_schema();

// File: SettingsUncheckedCreateNestedOneWithoutUserInput.schema.ts
const __makeSchema_SettingsUncheckedCreateNestedOneWithoutUserInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => SettingsCreateWithoutUserInputObjectSchema),
          z.lazy(() => SettingsUncheckedCreateWithoutUserInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => SettingsCreateOrConnectWithoutUserInputObjectSchema).optional(),
      connect: z.lazy(() => SettingsWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const SettingsUncheckedCreateNestedOneWithoutUserInputObjectSchema: z.ZodType<Prisma.SettingsUncheckedCreateNestedOneWithoutUserInput> =
  __makeSchema_SettingsUncheckedCreateNestedOneWithoutUserInput_schema() as unknown as z.ZodType<Prisma.SettingsUncheckedCreateNestedOneWithoutUserInput>;
export const SettingsUncheckedCreateNestedOneWithoutUserInputObjectZodSchema =
  __makeSchema_SettingsUncheckedCreateNestedOneWithoutUserInput_schema();

// File: DialogUncheckedCreateNestedManyWithoutUserInput.schema.ts
const __makeSchema_DialogUncheckedCreateNestedManyWithoutUserInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => DialogCreateWithoutUserInputObjectSchema),
          z.lazy(() => DialogCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => DialogUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => DialogUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DialogCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => DialogCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => DialogCreateManyUserInputEnvelopeObjectSchema).optional(),
      connect: z
        .union([
          z.lazy(() => DialogWhereUniqueInputObjectSchema),
          z.lazy(() => DialogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const DialogUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.DialogUncheckedCreateNestedManyWithoutUserInput> =
  __makeSchema_DialogUncheckedCreateNestedManyWithoutUserInput_schema() as unknown as z.ZodType<Prisma.DialogUncheckedCreateNestedManyWithoutUserInput>;
export const DialogUncheckedCreateNestedManyWithoutUserInputObjectZodSchema =
  __makeSchema_DialogUncheckedCreateNestedManyWithoutUserInput_schema();

// File: StringFieldUpdateOperationsInput.schema.ts
const __makeSchema_StringFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: z.string().optional(),
    })
    .strict();
export const StringFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  __makeSchema_StringFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;
export const StringFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_StringFieldUpdateOperationsInput_schema();

// File: NullableStringFieldUpdateOperationsInput.schema.ts
const __makeSchema_NullableStringFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: z.string().optional(),
      unset: z.boolean().optional(),
    })
    .strict();
export const NullableStringFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  __makeSchema_NullableStringFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;
export const NullableStringFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_NullableStringFieldUpdateOperationsInput_schema();

// File: OAuthProviderListUpdateEnvelopeInput.schema.ts
const __makeSchema_OAuthProviderListUpdateEnvelopeInput_schema = () =>
  z
    .object({
      set: z
        .union([
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      push: z
        .union([
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      updateMany: z.lazy(() => OAuthProviderUpdateManyInputObjectSchema).optional(),
      deleteMany: z.lazy(() => OAuthProviderDeleteManyInputObjectSchema).optional(),
    })
    .strict();
export const OAuthProviderListUpdateEnvelopeInputObjectSchema: z.ZodType<Prisma.OAuthProviderListUpdateEnvelopeInput> =
  __makeSchema_OAuthProviderListUpdateEnvelopeInput_schema() as unknown as z.ZodType<Prisma.OAuthProviderListUpdateEnvelopeInput>;
export const OAuthProviderListUpdateEnvelopeInputObjectZodSchema =
  __makeSchema_OAuthProviderListUpdateEnvelopeInput_schema();

// File: NullableDateTimeFieldUpdateOperationsInput.schema.ts
const __makeSchema_NullableDateTimeFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      unset: z.boolean().optional(),
    })
    .strict();
export const NullableDateTimeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  __makeSchema_NullableDateTimeFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput>;
export const NullableDateTimeFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_NullableDateTimeFieldUpdateOperationsInput_schema();

// File: DateTimeFieldUpdateOperationsInput.schema.ts
const __makeSchema_DateTimeFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const DateTimeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  __makeSchema_DateTimeFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;
export const DateTimeFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_DateTimeFieldUpdateOperationsInput_schema();

// File: ApplicationUpdateManyWithoutOwnerNestedInput.schema.ts
const __makeSchema_ApplicationUpdateManyWithoutOwnerNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationCreateWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationCreateWithoutOwnerInputObjectSchema).array(),
          z.lazy(() => ApplicationUncheckedCreateWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationUncheckedCreateWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApplicationCreateOrConnectWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationCreateOrConnectWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ApplicationUpsertWithWhereUniqueWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationUpsertWithWhereUniqueWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ApplicationCreateManyOwnerInputEnvelopeObjectSchema).optional(),
      set: z
        .union([
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ApplicationUpdateWithWhereUniqueWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationUpdateWithWhereUniqueWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ApplicationUpdateManyWithWhereWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationUpdateManyWithWhereWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ApplicationScalarWhereInputObjectSchema),
          z.lazy(() => ApplicationScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApplicationUpdateManyWithoutOwnerNestedInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateManyWithoutOwnerNestedInput> =
  __makeSchema_ApplicationUpdateManyWithoutOwnerNestedInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateManyWithoutOwnerNestedInput>;
export const ApplicationUpdateManyWithoutOwnerNestedInputObjectZodSchema =
  __makeSchema_ApplicationUpdateManyWithoutOwnerNestedInput_schema();

// File: UserApplicationUpdateManyWithoutUserNestedInput.schema.ts
const __makeSchema_UserApplicationUpdateManyWithoutUserNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserApplicationCreateWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => UserApplicationUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserApplicationCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserApplicationUpsertWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationUpsertWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => UserApplicationCreateManyUserInputEnvelopeObjectSchema).optional(),
      set: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserApplicationUpdateWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationUpdateWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserApplicationUpdateManyWithWhereWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationUpdateManyWithWhereWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserApplicationScalarWhereInputObjectSchema),
          z.lazy(() => UserApplicationScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.UserApplicationUpdateManyWithoutUserNestedInput> =
  __makeSchema_UserApplicationUpdateManyWithoutUserNestedInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpdateManyWithoutUserNestedInput>;
export const UserApplicationUpdateManyWithoutUserNestedInputObjectZodSchema =
  __makeSchema_UserApplicationUpdateManyWithoutUserNestedInput_schema();

// File: ApiKeyUpdateManyWithoutUserNestedInput.schema.ts
const __makeSchema_ApiKeyUpdateManyWithoutUserNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApiKeyCreateWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => ApiKeyUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApiKeyCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ApiKeyUpsertWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyUpsertWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ApiKeyCreateManyUserInputEnvelopeObjectSchema).optional(),
      set: z
        .union([
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ApiKeyUpdateWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyUpdateWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ApiKeyUpdateManyWithWhereWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyUpdateManyWithWhereWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ApiKeyScalarWhereInputObjectSchema),
          z.lazy(() => ApiKeyScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApiKeyUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ApiKeyUpdateManyWithoutUserNestedInput> =
  __makeSchema_ApiKeyUpdateManyWithoutUserNestedInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUpdateManyWithoutUserNestedInput>;
export const ApiKeyUpdateManyWithoutUserNestedInputObjectZodSchema =
  __makeSchema_ApiKeyUpdateManyWithoutUserNestedInput_schema();

// File: SettingsUpdateOneWithoutUserNestedInput.schema.ts
const __makeSchema_SettingsUpdateOneWithoutUserNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => SettingsCreateWithoutUserInputObjectSchema),
          z.lazy(() => SettingsUncheckedCreateWithoutUserInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => SettingsCreateOrConnectWithoutUserInputObjectSchema).optional(),
      upsert: z.lazy(() => SettingsUpsertWithoutUserInputObjectSchema).optional(),
      disconnect: z.union([z.boolean(), z.lazy(() => SettingsWhereInputObjectSchema)]).optional(),
      delete: z.union([z.boolean(), z.lazy(() => SettingsWhereInputObjectSchema)]).optional(),
      connect: z.lazy(() => SettingsWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => SettingsUpdateToOneWithWhereWithoutUserInputObjectSchema),
          z.lazy(() => SettingsUpdateWithoutUserInputObjectSchema),
          z.lazy(() => SettingsUncheckedUpdateWithoutUserInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const SettingsUpdateOneWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.SettingsUpdateOneWithoutUserNestedInput> =
  __makeSchema_SettingsUpdateOneWithoutUserNestedInput_schema() as unknown as z.ZodType<Prisma.SettingsUpdateOneWithoutUserNestedInput>;
export const SettingsUpdateOneWithoutUserNestedInputObjectZodSchema =
  __makeSchema_SettingsUpdateOneWithoutUserNestedInput_schema();

// File: DialogUpdateManyWithoutUserNestedInput.schema.ts
const __makeSchema_DialogUpdateManyWithoutUserNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => DialogCreateWithoutUserInputObjectSchema),
          z.lazy(() => DialogCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => DialogUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => DialogUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DialogCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => DialogCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => DialogUpsertWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => DialogUpsertWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => DialogCreateManyUserInputEnvelopeObjectSchema).optional(),
      set: z
        .union([
          z.lazy(() => DialogWhereUniqueInputObjectSchema),
          z.lazy(() => DialogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DialogWhereUniqueInputObjectSchema),
          z.lazy(() => DialogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DialogWhereUniqueInputObjectSchema),
          z.lazy(() => DialogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DialogWhereUniqueInputObjectSchema),
          z.lazy(() => DialogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => DialogUpdateWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => DialogUpdateWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => DialogUpdateManyWithWhereWithoutUserInputObjectSchema),
          z.lazy(() => DialogUpdateManyWithWhereWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DialogScalarWhereInputObjectSchema),
          z.lazy(() => DialogScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const DialogUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.DialogUpdateManyWithoutUserNestedInput> =
  __makeSchema_DialogUpdateManyWithoutUserNestedInput_schema() as unknown as z.ZodType<Prisma.DialogUpdateManyWithoutUserNestedInput>;
export const DialogUpdateManyWithoutUserNestedInputObjectZodSchema =
  __makeSchema_DialogUpdateManyWithoutUserNestedInput_schema();

// File: ApplicationUncheckedUpdateManyWithoutOwnerNestedInput.schema.ts
const __makeSchema_ApplicationUncheckedUpdateManyWithoutOwnerNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationCreateWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationCreateWithoutOwnerInputObjectSchema).array(),
          z.lazy(() => ApplicationUncheckedCreateWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationUncheckedCreateWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApplicationCreateOrConnectWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationCreateOrConnectWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ApplicationUpsertWithWhereUniqueWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationUpsertWithWhereUniqueWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ApplicationCreateManyOwnerInputEnvelopeObjectSchema).optional(),
      set: z
        .union([
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ApplicationUpdateWithWhereUniqueWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationUpdateWithWhereUniqueWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ApplicationUpdateManyWithWhereWithoutOwnerInputObjectSchema),
          z.lazy(() => ApplicationUpdateManyWithWhereWithoutOwnerInputObjectSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ApplicationScalarWhereInputObjectSchema),
          z.lazy(() => ApplicationScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApplicationUncheckedUpdateManyWithoutOwnerNestedInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedUpdateManyWithoutOwnerNestedInput> =
  __makeSchema_ApplicationUncheckedUpdateManyWithoutOwnerNestedInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedUpdateManyWithoutOwnerNestedInput>;
export const ApplicationUncheckedUpdateManyWithoutOwnerNestedInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedUpdateManyWithoutOwnerNestedInput_schema();

// File: UserApplicationUncheckedUpdateManyWithoutUserNestedInput.schema.ts
const __makeSchema_UserApplicationUncheckedUpdateManyWithoutUserNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserApplicationCreateWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => UserApplicationUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserApplicationCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserApplicationUpsertWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationUpsertWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => UserApplicationCreateManyUserInputEnvelopeObjectSchema).optional(),
      set: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserApplicationUpdateWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationUpdateWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserApplicationUpdateManyWithWhereWithoutUserInputObjectSchema),
          z.lazy(() => UserApplicationUpdateManyWithWhereWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserApplicationScalarWhereInputObjectSchema),
          z.lazy(() => UserApplicationScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedUpdateManyWithoutUserNestedInput> =
  __makeSchema_UserApplicationUncheckedUpdateManyWithoutUserNestedInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedUpdateManyWithoutUserNestedInput>;
export const UserApplicationUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedUpdateManyWithoutUserNestedInput_schema();

// File: ApiKeyUncheckedUpdateManyWithoutUserNestedInput.schema.ts
const __makeSchema_ApiKeyUncheckedUpdateManyWithoutUserNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApiKeyCreateWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => ApiKeyUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApiKeyCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ApiKeyUpsertWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyUpsertWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ApiKeyCreateManyUserInputEnvelopeObjectSchema).optional(),
      set: z
        .union([
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
          z.lazy(() => ApiKeyWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ApiKeyUpdateWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyUpdateWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ApiKeyUpdateManyWithWhereWithoutUserInputObjectSchema),
          z.lazy(() => ApiKeyUpdateManyWithWhereWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ApiKeyScalarWhereInputObjectSchema),
          z.lazy(() => ApiKeyScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApiKeyUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ApiKeyUncheckedUpdateManyWithoutUserNestedInput> =
  __makeSchema_ApiKeyUncheckedUpdateManyWithoutUserNestedInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUncheckedUpdateManyWithoutUserNestedInput>;
export const ApiKeyUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema =
  __makeSchema_ApiKeyUncheckedUpdateManyWithoutUserNestedInput_schema();

// File: SettingsUncheckedUpdateOneWithoutUserNestedInput.schema.ts
const __makeSchema_SettingsUncheckedUpdateOneWithoutUserNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => SettingsCreateWithoutUserInputObjectSchema),
          z.lazy(() => SettingsUncheckedCreateWithoutUserInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => SettingsCreateOrConnectWithoutUserInputObjectSchema).optional(),
      upsert: z.lazy(() => SettingsUpsertWithoutUserInputObjectSchema).optional(),
      disconnect: z.union([z.boolean(), z.lazy(() => SettingsWhereInputObjectSchema)]).optional(),
      delete: z.union([z.boolean(), z.lazy(() => SettingsWhereInputObjectSchema)]).optional(),
      connect: z.lazy(() => SettingsWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => SettingsUpdateToOneWithWhereWithoutUserInputObjectSchema),
          z.lazy(() => SettingsUpdateWithoutUserInputObjectSchema),
          z.lazy(() => SettingsUncheckedUpdateWithoutUserInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const SettingsUncheckedUpdateOneWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.SettingsUncheckedUpdateOneWithoutUserNestedInput> =
  __makeSchema_SettingsUncheckedUpdateOneWithoutUserNestedInput_schema() as unknown as z.ZodType<Prisma.SettingsUncheckedUpdateOneWithoutUserNestedInput>;
export const SettingsUncheckedUpdateOneWithoutUserNestedInputObjectZodSchema =
  __makeSchema_SettingsUncheckedUpdateOneWithoutUserNestedInput_schema();

// File: DialogUncheckedUpdateManyWithoutUserNestedInput.schema.ts
const __makeSchema_DialogUncheckedUpdateManyWithoutUserNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => DialogCreateWithoutUserInputObjectSchema),
          z.lazy(() => DialogCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => DialogUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => DialogUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DialogCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => DialogCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => DialogUpsertWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => DialogUpsertWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => DialogCreateManyUserInputEnvelopeObjectSchema).optional(),
      set: z
        .union([
          z.lazy(() => DialogWhereUniqueInputObjectSchema),
          z.lazy(() => DialogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DialogWhereUniqueInputObjectSchema),
          z.lazy(() => DialogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DialogWhereUniqueInputObjectSchema),
          z.lazy(() => DialogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DialogWhereUniqueInputObjectSchema),
          z.lazy(() => DialogWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => DialogUpdateWithWhereUniqueWithoutUserInputObjectSchema),
          z.lazy(() => DialogUpdateWithWhereUniqueWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => DialogUpdateManyWithWhereWithoutUserInputObjectSchema),
          z.lazy(() => DialogUpdateManyWithWhereWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DialogScalarWhereInputObjectSchema),
          z.lazy(() => DialogScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const DialogUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.DialogUncheckedUpdateManyWithoutUserNestedInput> =
  __makeSchema_DialogUncheckedUpdateManyWithoutUserNestedInput_schema() as unknown as z.ZodType<Prisma.DialogUncheckedUpdateManyWithoutUserNestedInput>;
export const DialogUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema =
  __makeSchema_DialogUncheckedUpdateManyWithoutUserNestedInput_schema();

// File: ApplicationEntryPointsNullableCreateEnvelopeInput.schema.ts
const __makeSchema_ApplicationEntryPointsNullableCreateEnvelopeInput_schema = () =>
  z
    .object({
      set: z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema: z.ZodType<Prisma.ApplicationEntryPointsNullableCreateEnvelopeInput> =
  __makeSchema_ApplicationEntryPointsNullableCreateEnvelopeInput_schema() as unknown as z.ZodType<Prisma.ApplicationEntryPointsNullableCreateEnvelopeInput>;
export const ApplicationEntryPointsNullableCreateEnvelopeInputObjectZodSchema =
  __makeSchema_ApplicationEntryPointsNullableCreateEnvelopeInput_schema();

// File: ApplicationEntryPointsCreateInput.schema.ts
const __makeSchema_ApplicationEntryPointsCreateInput_schema = () =>
  z
    .object({
      frontend: z.string().optional().nullable(),
      backend: z.string().optional().nullable(),
    })
    .strict();
export const ApplicationEntryPointsCreateInputObjectSchema: z.ZodType<Prisma.ApplicationEntryPointsCreateInput> =
  __makeSchema_ApplicationEntryPointsCreateInput_schema() as unknown as z.ZodType<Prisma.ApplicationEntryPointsCreateInput>;
export const ApplicationEntryPointsCreateInputObjectZodSchema =
  __makeSchema_ApplicationEntryPointsCreateInput_schema();

// File: ApplicationCreatepermissionsInput.schema.ts
const __makeSchema_ApplicationCreatepermissionsInput_schema = () =>
  z
    .object({
      set: z.string().array(),
    })
    .strict();
export const ApplicationCreatepermissionsInputObjectSchema: z.ZodType<Prisma.ApplicationCreatepermissionsInput> =
  __makeSchema_ApplicationCreatepermissionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreatepermissionsInput>;
export const ApplicationCreatepermissionsInputObjectZodSchema =
  __makeSchema_ApplicationCreatepermissionsInput_schema();

// File: ApplicationStorageMetaNullableCreateEnvelopeInput.schema.ts
const __makeSchema_ApplicationStorageMetaNullableCreateEnvelopeInput_schema = () =>
  z
    .object({
      set: z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema: z.ZodType<Prisma.ApplicationStorageMetaNullableCreateEnvelopeInput> =
  __makeSchema_ApplicationStorageMetaNullableCreateEnvelopeInput_schema() as unknown as z.ZodType<Prisma.ApplicationStorageMetaNullableCreateEnvelopeInput>;
export const ApplicationStorageMetaNullableCreateEnvelopeInputObjectZodSchema =
  __makeSchema_ApplicationStorageMetaNullableCreateEnvelopeInput_schema();

// File: ApplicationStorageMetaCreateInput.schema.ts
const __makeSchema_ApplicationStorageMetaCreateInput_schema = () =>
  z
    .object({
      rootDir: z.string().optional().nullable(),
      archivePath: z.string().optional().nullable(),
      contentPath: z.string().optional().nullable(),
      manifestPath: z.string().optional().nullable(),
    })
    .strict();
export const ApplicationStorageMetaCreateInputObjectSchema: z.ZodType<Prisma.ApplicationStorageMetaCreateInput> =
  __makeSchema_ApplicationStorageMetaCreateInput_schema() as unknown as z.ZodType<Prisma.ApplicationStorageMetaCreateInput>;
export const ApplicationStorageMetaCreateInputObjectZodSchema =
  __makeSchema_ApplicationStorageMetaCreateInput_schema();

// File: UserCreateNestedOneWithoutApplicationsInput.schema.ts
const __makeSchema_UserCreateNestedOneWithoutApplicationsInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutApplicationsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutApplicationsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutApplicationsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutApplicationsInput> =
  __makeSchema_UserCreateNestedOneWithoutApplicationsInput_schema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutApplicationsInput>;
export const UserCreateNestedOneWithoutApplicationsInputObjectZodSchema =
  __makeSchema_UserCreateNestedOneWithoutApplicationsInput_schema();

// File: ApplicationVersionCreateNestedManyWithoutApplicationInput.schema.ts
const __makeSchema_ApplicationVersionCreateNestedManyWithoutApplicationInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationVersionCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => ApplicationVersionCreateWithoutApplicationInputObjectSchema).array(),
          z.lazy(() => ApplicationVersionUncheckedCreateWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionUncheckedCreateWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApplicationVersionCreateOrConnectWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionCreateOrConnectWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ApplicationVersionCreateManyApplicationInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApplicationVersionCreateNestedManyWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionCreateNestedManyWithoutApplicationInput> =
  __makeSchema_ApplicationVersionCreateNestedManyWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionCreateNestedManyWithoutApplicationInput>;
export const ApplicationVersionCreateNestedManyWithoutApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionCreateNestedManyWithoutApplicationInput_schema();

// File: UserApplicationCreateNestedManyWithoutApplicationInput.schema.ts
const __makeSchema_UserApplicationCreateNestedManyWithoutApplicationInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserApplicationCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationCreateWithoutApplicationInputObjectSchema).array(),
          z.lazy(() => UserApplicationUncheckedCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationUncheckedCreateWithoutApplicationInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserApplicationCreateOrConnectWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationCreateOrConnectWithoutApplicationInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserApplicationCreateManyApplicationInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationCreateNestedManyWithoutApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationCreateNestedManyWithoutApplicationInput> =
  __makeSchema_UserApplicationCreateNestedManyWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateNestedManyWithoutApplicationInput>;
export const UserApplicationCreateNestedManyWithoutApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationCreateNestedManyWithoutApplicationInput_schema();

// File: ApplicationVersionUncheckedCreateNestedManyWithoutApplicationInput.schema.ts
const __makeSchema_ApplicationVersionUncheckedCreateNestedManyWithoutApplicationInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationVersionCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => ApplicationVersionCreateWithoutApplicationInputObjectSchema).array(),
          z.lazy(() => ApplicationVersionUncheckedCreateWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionUncheckedCreateWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApplicationVersionCreateOrConnectWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionCreateOrConnectWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ApplicationVersionCreateManyApplicationInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApplicationVersionUncheckedCreateNestedManyWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUncheckedCreateNestedManyWithoutApplicationInput> =
  __makeSchema_ApplicationVersionUncheckedCreateNestedManyWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUncheckedCreateNestedManyWithoutApplicationInput>;
export const ApplicationVersionUncheckedCreateNestedManyWithoutApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionUncheckedCreateNestedManyWithoutApplicationInput_schema();

// File: UserApplicationUncheckedCreateNestedManyWithoutApplicationInput.schema.ts
const __makeSchema_UserApplicationUncheckedCreateNestedManyWithoutApplicationInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserApplicationCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationCreateWithoutApplicationInputObjectSchema).array(),
          z.lazy(() => UserApplicationUncheckedCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationUncheckedCreateWithoutApplicationInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserApplicationCreateOrConnectWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationCreateOrConnectWithoutApplicationInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserApplicationCreateManyApplicationInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedCreateNestedManyWithoutApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedCreateNestedManyWithoutApplicationInput> =
  __makeSchema_UserApplicationUncheckedCreateNestedManyWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedCreateNestedManyWithoutApplicationInput>;
export const UserApplicationUncheckedCreateNestedManyWithoutApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedCreateNestedManyWithoutApplicationInput_schema();

// File: EnumApplicationTypeFieldUpdateOperationsInput.schema.ts
const __makeSchema_EnumApplicationTypeFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: ApplicationTypeSchema.optional(),
    })
    .strict();
export const EnumApplicationTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumApplicationTypeFieldUpdateOperationsInput> =
  __makeSchema_EnumApplicationTypeFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.EnumApplicationTypeFieldUpdateOperationsInput>;
export const EnumApplicationTypeFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_EnumApplicationTypeFieldUpdateOperationsInput_schema();

// File: EnumApplicationStatusFieldUpdateOperationsInput.schema.ts
const __makeSchema_EnumApplicationStatusFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: ApplicationStatusSchema.optional(),
    })
    .strict();
export const EnumApplicationStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumApplicationStatusFieldUpdateOperationsInput> =
  __makeSchema_EnumApplicationStatusFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.EnumApplicationStatusFieldUpdateOperationsInput>;
export const EnumApplicationStatusFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_EnumApplicationStatusFieldUpdateOperationsInput_schema();

// File: BoolFieldUpdateOperationsInput.schema.ts
const __makeSchema_BoolFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: z.boolean().optional(),
    })
    .strict();
export const BoolFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  __makeSchema_BoolFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.BoolFieldUpdateOperationsInput>;
export const BoolFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_BoolFieldUpdateOperationsInput_schema();

// File: ApplicationEntryPointsNullableUpdateEnvelopeInput.schema.ts
const __makeSchema_ApplicationEntryPointsNullableUpdateEnvelopeInput_schema = () =>
  z
    .object({
      set: z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema).optional(),
      upsert: z.lazy(() => ApplicationEntryPointsUpsertInputObjectSchema).optional(),
      unset: z.boolean().optional(),
    })
    .strict();
export const ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema: z.ZodType<Prisma.ApplicationEntryPointsNullableUpdateEnvelopeInput> =
  __makeSchema_ApplicationEntryPointsNullableUpdateEnvelopeInput_schema() as unknown as z.ZodType<Prisma.ApplicationEntryPointsNullableUpdateEnvelopeInput>;
export const ApplicationEntryPointsNullableUpdateEnvelopeInputObjectZodSchema =
  __makeSchema_ApplicationEntryPointsNullableUpdateEnvelopeInput_schema();

// File: ApplicationUpdatepermissionsInput.schema.ts
const __makeSchema_ApplicationUpdatepermissionsInput_schema = () =>
  z
    .object({
      set: z.string().array().optional(),
      push: z.union([z.string(), z.string().array()]).optional(),
    })
    .strict();
export const ApplicationUpdatepermissionsInputObjectSchema: z.ZodType<Prisma.ApplicationUpdatepermissionsInput> =
  __makeSchema_ApplicationUpdatepermissionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdatepermissionsInput>;
export const ApplicationUpdatepermissionsInputObjectZodSchema =
  __makeSchema_ApplicationUpdatepermissionsInput_schema();

// File: ApplicationStorageMetaNullableUpdateEnvelopeInput.schema.ts
const __makeSchema_ApplicationStorageMetaNullableUpdateEnvelopeInput_schema = () =>
  z
    .object({
      set: z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema).optional(),
      upsert: z.lazy(() => ApplicationStorageMetaUpsertInputObjectSchema).optional(),
      unset: z.boolean().optional(),
    })
    .strict();
export const ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema: z.ZodType<Prisma.ApplicationStorageMetaNullableUpdateEnvelopeInput> =
  __makeSchema_ApplicationStorageMetaNullableUpdateEnvelopeInput_schema() as unknown as z.ZodType<Prisma.ApplicationStorageMetaNullableUpdateEnvelopeInput>;
export const ApplicationStorageMetaNullableUpdateEnvelopeInputObjectZodSchema =
  __makeSchema_ApplicationStorageMetaNullableUpdateEnvelopeInput_schema();

// File: UserUpdateOneWithoutApplicationsNestedInput.schema.ts
const __makeSchema_UserUpdateOneWithoutApplicationsNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutApplicationsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutApplicationsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutApplicationsInputObjectSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutApplicationsInputObjectSchema).optional(),
      disconnect: z.boolean().optional(),
      delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutApplicationsInputObjectSchema),
          z.lazy(() => UserUpdateWithoutApplicationsInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutApplicationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneWithoutApplicationsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutApplicationsNestedInput> =
  __makeSchema_UserUpdateOneWithoutApplicationsNestedInput_schema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutApplicationsNestedInput>;
export const UserUpdateOneWithoutApplicationsNestedInputObjectZodSchema =
  __makeSchema_UserUpdateOneWithoutApplicationsNestedInput_schema();

// File: ApplicationVersionUpdateManyWithoutApplicationNestedInput.schema.ts
const __makeSchema_ApplicationVersionUpdateManyWithoutApplicationNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationVersionCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => ApplicationVersionCreateWithoutApplicationInputObjectSchema).array(),
          z.lazy(() => ApplicationVersionUncheckedCreateWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionUncheckedCreateWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApplicationVersionCreateOrConnectWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionCreateOrConnectWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ApplicationVersionCreateManyApplicationInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ApplicationVersionUpdateManyWithWhereWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionUpdateManyWithWhereWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ApplicationVersionScalarWhereInputObjectSchema),
          z.lazy(() => ApplicationVersionScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApplicationVersionUpdateManyWithoutApplicationNestedInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUpdateManyWithoutApplicationNestedInput> =
  __makeSchema_ApplicationVersionUpdateManyWithoutApplicationNestedInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUpdateManyWithoutApplicationNestedInput>;
export const ApplicationVersionUpdateManyWithoutApplicationNestedInputObjectZodSchema =
  __makeSchema_ApplicationVersionUpdateManyWithoutApplicationNestedInput_schema();

// File: UserApplicationUpdateManyWithoutApplicationNestedInput.schema.ts
const __makeSchema_UserApplicationUpdateManyWithoutApplicationNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserApplicationCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationCreateWithoutApplicationInputObjectSchema).array(),
          z.lazy(() => UserApplicationUncheckedCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationUncheckedCreateWithoutApplicationInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserApplicationCreateOrConnectWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationCreateOrConnectWithoutApplicationInputObjectSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserApplicationUpsertWithWhereUniqueWithoutApplicationInputObjectSchema),
          z
            .lazy(() => UserApplicationUpsertWithWhereUniqueWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserApplicationCreateManyApplicationInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserApplicationUpdateWithWhereUniqueWithoutApplicationInputObjectSchema),
          z
            .lazy(() => UserApplicationUpdateWithWhereUniqueWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserApplicationUpdateManyWithWhereWithoutApplicationInputObjectSchema),
          z
            .lazy(() => UserApplicationUpdateManyWithWhereWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserApplicationScalarWhereInputObjectSchema),
          z.lazy(() => UserApplicationScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUpdateManyWithoutApplicationNestedInputObjectSchema: z.ZodType<Prisma.UserApplicationUpdateManyWithoutApplicationNestedInput> =
  __makeSchema_UserApplicationUpdateManyWithoutApplicationNestedInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpdateManyWithoutApplicationNestedInput>;
export const UserApplicationUpdateManyWithoutApplicationNestedInputObjectZodSchema =
  __makeSchema_UserApplicationUpdateManyWithoutApplicationNestedInput_schema();

// File: ApplicationVersionUncheckedUpdateManyWithoutApplicationNestedInput.schema.ts
const __makeSchema_ApplicationVersionUncheckedUpdateManyWithoutApplicationNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationVersionCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => ApplicationVersionCreateWithoutApplicationInputObjectSchema).array(),
          z.lazy(() => ApplicationVersionUncheckedCreateWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionUncheckedCreateWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ApplicationVersionCreateOrConnectWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionCreateOrConnectWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ApplicationVersionCreateManyApplicationInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
          z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ApplicationVersionUpdateManyWithWhereWithoutApplicationInputObjectSchema),
          z
            .lazy(() => ApplicationVersionUpdateManyWithWhereWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ApplicationVersionScalarWhereInputObjectSchema),
          z.lazy(() => ApplicationVersionScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ApplicationVersionUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUncheckedUpdateManyWithoutApplicationNestedInput> =
  __makeSchema_ApplicationVersionUncheckedUpdateManyWithoutApplicationNestedInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUncheckedUpdateManyWithoutApplicationNestedInput>;
export const ApplicationVersionUncheckedUpdateManyWithoutApplicationNestedInputObjectZodSchema =
  __makeSchema_ApplicationVersionUncheckedUpdateManyWithoutApplicationNestedInput_schema();

// File: UserApplicationUncheckedUpdateManyWithoutApplicationNestedInput.schema.ts
const __makeSchema_UserApplicationUncheckedUpdateManyWithoutApplicationNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserApplicationCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationCreateWithoutApplicationInputObjectSchema).array(),
          z.lazy(() => UserApplicationUncheckedCreateWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationUncheckedCreateWithoutApplicationInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserApplicationCreateOrConnectWithoutApplicationInputObjectSchema),
          z.lazy(() => UserApplicationCreateOrConnectWithoutApplicationInputObjectSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserApplicationUpsertWithWhereUniqueWithoutApplicationInputObjectSchema),
          z
            .lazy(() => UserApplicationUpsertWithWhereUniqueWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserApplicationCreateManyApplicationInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
          z.lazy(() => UserApplicationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserApplicationUpdateWithWhereUniqueWithoutApplicationInputObjectSchema),
          z
            .lazy(() => UserApplicationUpdateWithWhereUniqueWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserApplicationUpdateManyWithWhereWithoutApplicationInputObjectSchema),
          z
            .lazy(() => UserApplicationUpdateManyWithWhereWithoutApplicationInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserApplicationScalarWhereInputObjectSchema),
          z.lazy(() => UserApplicationScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedUpdateManyWithoutApplicationNestedInput> =
  __makeSchema_UserApplicationUncheckedUpdateManyWithoutApplicationNestedInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedUpdateManyWithoutApplicationNestedInput>;
export const UserApplicationUncheckedUpdateManyWithoutApplicationNestedInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedUpdateManyWithoutApplicationNestedInput_schema();

// File: ApplicationVersionCreatepermissionsInput.schema.ts
const __makeSchema_ApplicationVersionCreatepermissionsInput_schema = () =>
  z
    .object({
      set: z.string().array(),
    })
    .strict();
export const ApplicationVersionCreatepermissionsInputObjectSchema: z.ZodType<Prisma.ApplicationVersionCreatepermissionsInput> =
  __makeSchema_ApplicationVersionCreatepermissionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionCreatepermissionsInput>;
export const ApplicationVersionCreatepermissionsInputObjectZodSchema =
  __makeSchema_ApplicationVersionCreatepermissionsInput_schema();

// File: ApplicationCreateNestedOneWithoutVersionsInput.schema.ts
const __makeSchema_ApplicationCreateNestedOneWithoutVersionsInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationCreateWithoutVersionsInputObjectSchema),
          z.lazy(() => ApplicationUncheckedCreateWithoutVersionsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ApplicationCreateOrConnectWithoutVersionsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ApplicationWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationCreateNestedOneWithoutVersionsInputObjectSchema: z.ZodType<Prisma.ApplicationCreateNestedOneWithoutVersionsInput> =
  __makeSchema_ApplicationCreateNestedOneWithoutVersionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateNestedOneWithoutVersionsInput>;
export const ApplicationCreateNestedOneWithoutVersionsInputObjectZodSchema =
  __makeSchema_ApplicationCreateNestedOneWithoutVersionsInput_schema();

// File: ApplicationVersionUpdatepermissionsInput.schema.ts
const __makeSchema_ApplicationVersionUpdatepermissionsInput_schema = () =>
  z
    .object({
      set: z.string().array().optional(),
      push: z.union([z.string(), z.string().array()]).optional(),
    })
    .strict();
export const ApplicationVersionUpdatepermissionsInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUpdatepermissionsInput> =
  __makeSchema_ApplicationVersionUpdatepermissionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUpdatepermissionsInput>;
export const ApplicationVersionUpdatepermissionsInputObjectZodSchema =
  __makeSchema_ApplicationVersionUpdatepermissionsInput_schema();

// File: ApplicationUpdateOneRequiredWithoutVersionsNestedInput.schema.ts
const __makeSchema_ApplicationUpdateOneRequiredWithoutVersionsNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationCreateWithoutVersionsInputObjectSchema),
          z.lazy(() => ApplicationUncheckedCreateWithoutVersionsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ApplicationCreateOrConnectWithoutVersionsInputObjectSchema)
        .optional(),
      upsert: z.lazy(() => ApplicationUpsertWithoutVersionsInputObjectSchema).optional(),
      connect: z.lazy(() => ApplicationWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ApplicationUpdateToOneWithWhereWithoutVersionsInputObjectSchema),
          z.lazy(() => ApplicationUpdateWithoutVersionsInputObjectSchema),
          z.lazy(() => ApplicationUncheckedUpdateWithoutVersionsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApplicationUpdateOneRequiredWithoutVersionsNestedInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateOneRequiredWithoutVersionsNestedInput> =
  __makeSchema_ApplicationUpdateOneRequiredWithoutVersionsNestedInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateOneRequiredWithoutVersionsNestedInput>;
export const ApplicationUpdateOneRequiredWithoutVersionsNestedInputObjectZodSchema =
  __makeSchema_ApplicationUpdateOneRequiredWithoutVersionsNestedInput_schema();

// File: UserCreateNestedOneWithoutInstallsInput.schema.ts
const __makeSchema_UserCreateNestedOneWithoutInstallsInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutInstallsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutInstallsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInstallsInputObjectSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutInstallsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInstallsInput> =
  __makeSchema_UserCreateNestedOneWithoutInstallsInput_schema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutInstallsInput>;
export const UserCreateNestedOneWithoutInstallsInputObjectZodSchema =
  __makeSchema_UserCreateNestedOneWithoutInstallsInput_schema();

// File: ApplicationCreateNestedOneWithoutUserInstallsInput.schema.ts
const __makeSchema_ApplicationCreateNestedOneWithoutUserInstallsInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationCreateWithoutUserInstallsInputObjectSchema),
          z.lazy(() => ApplicationUncheckedCreateWithoutUserInstallsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ApplicationCreateOrConnectWithoutUserInstallsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ApplicationWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationCreateNestedOneWithoutUserInstallsInputObjectSchema: z.ZodType<Prisma.ApplicationCreateNestedOneWithoutUserInstallsInput> =
  __makeSchema_ApplicationCreateNestedOneWithoutUserInstallsInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateNestedOneWithoutUserInstallsInput>;
export const ApplicationCreateNestedOneWithoutUserInstallsInputObjectZodSchema =
  __makeSchema_ApplicationCreateNestedOneWithoutUserInstallsInput_schema();

// File: UserUpdateOneRequiredWithoutInstallsNestedInput.schema.ts
const __makeSchema_UserUpdateOneRequiredWithoutInstallsNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutInstallsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutInstallsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInstallsInputObjectSchema).optional(),
      upsert: z.lazy(() => UserUpsertWithoutInstallsInputObjectSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutInstallsInputObjectSchema),
          z.lazy(() => UserUpdateWithoutInstallsInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutInstallsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneRequiredWithoutInstallsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutInstallsNestedInput> =
  __makeSchema_UserUpdateOneRequiredWithoutInstallsNestedInput_schema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutInstallsNestedInput>;
export const UserUpdateOneRequiredWithoutInstallsNestedInputObjectZodSchema =
  __makeSchema_UserUpdateOneRequiredWithoutInstallsNestedInput_schema();

// File: ApplicationUpdateOneRequiredWithoutUserInstallsNestedInput.schema.ts
const __makeSchema_ApplicationUpdateOneRequiredWithoutUserInstallsNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => ApplicationCreateWithoutUserInstallsInputObjectSchema),
          z.lazy(() => ApplicationUncheckedCreateWithoutUserInstallsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ApplicationCreateOrConnectWithoutUserInstallsInputObjectSchema)
        .optional(),
      upsert: z.lazy(() => ApplicationUpsertWithoutUserInstallsInputObjectSchema).optional(),
      connect: z.lazy(() => ApplicationWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ApplicationUpdateToOneWithWhereWithoutUserInstallsInputObjectSchema),
          z.lazy(() => ApplicationUpdateWithoutUserInstallsInputObjectSchema),
          z.lazy(() => ApplicationUncheckedUpdateWithoutUserInstallsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApplicationUpdateOneRequiredWithoutUserInstallsNestedInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateOneRequiredWithoutUserInstallsNestedInput> =
  __makeSchema_ApplicationUpdateOneRequiredWithoutUserInstallsNestedInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateOneRequiredWithoutUserInstallsNestedInput>;
export const ApplicationUpdateOneRequiredWithoutUserInstallsNestedInputObjectZodSchema =
  __makeSchema_ApplicationUpdateOneRequiredWithoutUserInstallsNestedInput_schema();

// File: UserCreateNestedOneWithoutApiKeysInput.schema.ts
const __makeSchema_UserCreateNestedOneWithoutApiKeysInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutApiKeysInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutApiKeysInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutApiKeysInputObjectSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutApiKeysInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutApiKeysInput> =
  __makeSchema_UserCreateNestedOneWithoutApiKeysInput_schema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutApiKeysInput>;
export const UserCreateNestedOneWithoutApiKeysInputObjectZodSchema =
  __makeSchema_UserCreateNestedOneWithoutApiKeysInput_schema();

// File: UserUpdateOneRequiredWithoutApiKeysNestedInput.schema.ts
const __makeSchema_UserUpdateOneRequiredWithoutApiKeysNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutApiKeysInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutApiKeysInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutApiKeysInputObjectSchema).optional(),
      upsert: z.lazy(() => UserUpsertWithoutApiKeysInputObjectSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutApiKeysInputObjectSchema),
          z.lazy(() => UserUpdateWithoutApiKeysInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutApiKeysInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneRequiredWithoutApiKeysNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutApiKeysNestedInput> =
  __makeSchema_UserUpdateOneRequiredWithoutApiKeysNestedInput_schema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutApiKeysNestedInput>;
export const UserUpdateOneRequiredWithoutApiKeysNestedInputObjectZodSchema =
  __makeSchema_UserUpdateOneRequiredWithoutApiKeysNestedInput_schema();

// File: ModelSceneSettingsNullableCreateEnvelopeInput.schema.ts
const __makeSchema_ModelSceneSettingsNullableCreateEnvelopeInput_schema = () =>
  z
    .object({
      set: z.lazy(() => ModelSceneSettingsCreateInputObjectSchema).optional(),
    })
    .strict();
export const ModelSceneSettingsNullableCreateEnvelopeInputObjectSchema: z.ZodType<Prisma.ModelSceneSettingsNullableCreateEnvelopeInput> =
  __makeSchema_ModelSceneSettingsNullableCreateEnvelopeInput_schema() as unknown as z.ZodType<Prisma.ModelSceneSettingsNullableCreateEnvelopeInput>;
export const ModelSceneSettingsNullableCreateEnvelopeInputObjectZodSchema =
  __makeSchema_ModelSceneSettingsNullableCreateEnvelopeInput_schema();

// File: ModelSceneSettingsCreateInput.schema.ts
const __makeSchema_ModelSceneSettingsCreateInput_schema = () =>
  z
    .object({
      modelPath: z.string().optional().nullable(),
      sceneName: z.string().optional().nullable(),
      enableToonShader: z.boolean().optional().nullable(),
      lightIntensity: z.number().optional().nullable(),
      cameraDistance: z.number().optional().nullable(),
      animationSpeed: z.number().optional().nullable(),
    })
    .strict();
export const ModelSceneSettingsCreateInputObjectSchema: z.ZodType<Prisma.ModelSceneSettingsCreateInput> =
  __makeSchema_ModelSceneSettingsCreateInput_schema() as unknown as z.ZodType<Prisma.ModelSceneSettingsCreateInput>;
export const ModelSceneSettingsCreateInputObjectZodSchema =
  __makeSchema_ModelSceneSettingsCreateInput_schema();

// File: UserCreateNestedOneWithoutSettingsInput.schema.ts
const __makeSchema_UserCreateNestedOneWithoutSettingsInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSettingsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutSettingsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSettingsInputObjectSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutSettingsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSettingsInput> =
  __makeSchema_UserCreateNestedOneWithoutSettingsInput_schema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutSettingsInput>;
export const UserCreateNestedOneWithoutSettingsInputObjectZodSchema =
  __makeSchema_UserCreateNestedOneWithoutSettingsInput_schema();

// File: IntFieldUpdateOperationsInput.schema.ts
const __makeSchema_IntFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: z.number().int().optional(),
      increment: z.number().int().optional(),
      decrement: z.number().int().optional(),
      multiply: z.number().int().optional(),
      divide: z.number().int().optional(),
    })
    .strict();
export const IntFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  __makeSchema_IntFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;
export const IntFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_IntFieldUpdateOperationsInput_schema();

// File: EnumLanguageFieldUpdateOperationsInput.schema.ts
const __makeSchema_EnumLanguageFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: LanguageSchema.optional(),
    })
    .strict();
export const EnumLanguageFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumLanguageFieldUpdateOperationsInput> =
  __makeSchema_EnumLanguageFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.EnumLanguageFieldUpdateOperationsInput>;
export const EnumLanguageFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_EnumLanguageFieldUpdateOperationsInput_schema();

// File: EnumThemeFieldUpdateOperationsInput.schema.ts
const __makeSchema_EnumThemeFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: ThemeSchema.optional(),
    })
    .strict();
export const EnumThemeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumThemeFieldUpdateOperationsInput> =
  __makeSchema_EnumThemeFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.EnumThemeFieldUpdateOperationsInput>;
export const EnumThemeFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_EnumThemeFieldUpdateOperationsInput_schema();

// File: EnumIdleModeFieldUpdateOperationsInput.schema.ts
const __makeSchema_EnumIdleModeFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: IdleModeSchema.optional(),
    })
    .strict();
export const EnumIdleModeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumIdleModeFieldUpdateOperationsInput> =
  __makeSchema_EnumIdleModeFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.EnumIdleModeFieldUpdateOperationsInput>;
export const EnumIdleModeFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_EnumIdleModeFieldUpdateOperationsInput_schema();

// File: ModelSceneSettingsNullableUpdateEnvelopeInput.schema.ts
const __makeSchema_ModelSceneSettingsNullableUpdateEnvelopeInput_schema = () =>
  z
    .object({
      set: z.lazy(() => ModelSceneSettingsCreateInputObjectSchema).optional(),
      upsert: z.lazy(() => ModelSceneSettingsUpsertInputObjectSchema).optional(),
      unset: z.boolean().optional(),
    })
    .strict();
export const ModelSceneSettingsNullableUpdateEnvelopeInputObjectSchema: z.ZodType<Prisma.ModelSceneSettingsNullableUpdateEnvelopeInput> =
  __makeSchema_ModelSceneSettingsNullableUpdateEnvelopeInput_schema() as unknown as z.ZodType<Prisma.ModelSceneSettingsNullableUpdateEnvelopeInput>;
export const ModelSceneSettingsNullableUpdateEnvelopeInputObjectZodSchema =
  __makeSchema_ModelSceneSettingsNullableUpdateEnvelopeInput_schema();

// File: UserUpdateOneRequiredWithoutSettingsNestedInput.schema.ts
const __makeSchema_UserUpdateOneRequiredWithoutSettingsNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSettingsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutSettingsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSettingsInputObjectSchema).optional(),
      upsert: z.lazy(() => UserUpsertWithoutSettingsInputObjectSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutSettingsInputObjectSchema),
          z.lazy(() => UserUpdateWithoutSettingsInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutSettingsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneRequiredWithoutSettingsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSettingsNestedInput> =
  __makeSchema_UserUpdateOneRequiredWithoutSettingsNestedInput_schema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutSettingsNestedInput>;
export const UserUpdateOneRequiredWithoutSettingsNestedInputObjectZodSchema =
  __makeSchema_UserUpdateOneRequiredWithoutSettingsNestedInput_schema();

// File: ChatMessageListCreateEnvelopeInput.schema.ts
const __makeSchema_ChatMessageListCreateEnvelopeInput_schema = () =>
  z
    .object({
      set: z
        .union([
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const ChatMessageListCreateEnvelopeInputObjectSchema: z.ZodType<Prisma.ChatMessageListCreateEnvelopeInput> =
  __makeSchema_ChatMessageListCreateEnvelopeInput_schema() as unknown as z.ZodType<Prisma.ChatMessageListCreateEnvelopeInput>;
export const ChatMessageListCreateEnvelopeInputObjectZodSchema =
  __makeSchema_ChatMessageListCreateEnvelopeInput_schema();

// File: ChatMessageCreateInput.schema.ts
const __makeSchema_ChatMessageCreateInput_schema = () =>
  z
    .object({
      id: z.string(),
      position: MessagePositionSchema,
      type: z.string(),
      text: z.string(),
      date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v)),
    })
    .strict();
export const ChatMessageCreateInputObjectSchema: z.ZodType<Prisma.ChatMessageCreateInput> =
  __makeSchema_ChatMessageCreateInput_schema() as unknown as z.ZodType<Prisma.ChatMessageCreateInput>;
export const ChatMessageCreateInputObjectZodSchema = __makeSchema_ChatMessageCreateInput_schema();

// File: UserCreateNestedOneWithoutDialogsInput.schema.ts
const __makeSchema_UserCreateNestedOneWithoutDialogsInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutDialogsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutDialogsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDialogsInputObjectSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutDialogsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDialogsInput> =
  __makeSchema_UserCreateNestedOneWithoutDialogsInput_schema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutDialogsInput>;
export const UserCreateNestedOneWithoutDialogsInputObjectZodSchema =
  __makeSchema_UserCreateNestedOneWithoutDialogsInput_schema();

// File: ChatMessageListUpdateEnvelopeInput.schema.ts
const __makeSchema_ChatMessageListUpdateEnvelopeInput_schema = () =>
  z
    .object({
      set: z
        .union([
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      push: z
        .union([
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      updateMany: z.lazy(() => ChatMessageUpdateManyInputObjectSchema).optional(),
      deleteMany: z.lazy(() => ChatMessageDeleteManyInputObjectSchema).optional(),
    })
    .strict();
export const ChatMessageListUpdateEnvelopeInputObjectSchema: z.ZodType<Prisma.ChatMessageListUpdateEnvelopeInput> =
  __makeSchema_ChatMessageListUpdateEnvelopeInput_schema() as unknown as z.ZodType<Prisma.ChatMessageListUpdateEnvelopeInput>;
export const ChatMessageListUpdateEnvelopeInputObjectZodSchema =
  __makeSchema_ChatMessageListUpdateEnvelopeInput_schema();

// File: UserUpdateOneRequiredWithoutDialogsNestedInput.schema.ts
const __makeSchema_UserUpdateOneRequiredWithoutDialogsNestedInput_schema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutDialogsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutDialogsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDialogsInputObjectSchema).optional(),
      upsert: z.lazy(() => UserUpsertWithoutDialogsInputObjectSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutDialogsInputObjectSchema),
          z.lazy(() => UserUpdateWithoutDialogsInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutDialogsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneRequiredWithoutDialogsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDialogsNestedInput> =
  __makeSchema_UserUpdateOneRequiredWithoutDialogsNestedInput_schema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutDialogsNestedInput>;
export const UserUpdateOneRequiredWithoutDialogsNestedInputObjectZodSchema =
  __makeSchema_UserUpdateOneRequiredWithoutDialogsNestedInput_schema();

// File: NestedStringFilter.schema.ts

const nestedstringfilterSchema = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilterObjectSchema)]).optional(),
  })
  .strict();
export const NestedStringFilterObjectSchema: z.ZodType<Prisma.NestedStringFilter> =
  nestedstringfilterSchema as unknown as z.ZodType<Prisma.NestedStringFilter>;
export const NestedStringFilterObjectZodSchema = nestedstringfilterSchema;

// File: NestedStringNullableFilter.schema.ts

const nestedstringnullablefilterSchema = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterObjectSchema)])
      .optional()
      .nullable(),
    isSet: z.boolean().optional(),
  })
  .strict();
export const NestedStringNullableFilterObjectSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  nestedstringnullablefilterSchema as unknown as z.ZodType<Prisma.NestedStringNullableFilter>;
export const NestedStringNullableFilterObjectZodSchema = nestedstringnullablefilterSchema;

// File: OAuthProviderWhereInput.schema.ts

const oauthproviderwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => OAuthProviderWhereInputObjectSchema),
        z.lazy(() => OAuthProviderWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => OAuthProviderWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => OAuthProviderWhereInputObjectSchema),
        z.lazy(() => OAuthProviderWhereInputObjectSchema).array(),
      ])
      .optional(),
    provider: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    providerId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  })
  .strict();
export const OAuthProviderWhereInputObjectSchema: z.ZodType<Prisma.OAuthProviderWhereInput> =
  oauthproviderwhereinputSchema as unknown as z.ZodType<Prisma.OAuthProviderWhereInput>;
export const OAuthProviderWhereInputObjectZodSchema = oauthproviderwhereinputSchema;

// File: NestedDateTimeNullableFilter.schema.ts

const nesteddatetimenullablefilterSchema = z
  .object({
    equals: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional()
      .nullable(),
    in: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
    notIn: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
    lt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    lte: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    gt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    gte: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    not: z
      .union([
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
        z.lazy(() => NestedDateTimeNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    isSet: z.boolean().optional(),
  })
  .strict();
export const NestedDateTimeNullableFilterObjectSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  nesteddatetimenullablefilterSchema as unknown as z.ZodType<Prisma.NestedDateTimeNullableFilter>;
export const NestedDateTimeNullableFilterObjectZodSchema = nesteddatetimenullablefilterSchema;

// File: NestedDateTimeFilter.schema.ts

const nesteddatetimefilterSchema = z
  .object({
    equals: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    in: z.union([z.date().array(), z.string().datetime().array()]).optional(),
    notIn: z.union([z.date().array(), z.string().datetime().array()]).optional(),
    lt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    lte: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    gt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    gte: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    not: z
      .union([
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
        z.lazy(() => NestedDateTimeFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const NestedDateTimeFilterObjectSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  nesteddatetimefilterSchema as unknown as z.ZodType<Prisma.NestedDateTimeFilter>;
export const NestedDateTimeFilterObjectZodSchema = nesteddatetimefilterSchema;

// File: NestedStringWithAggregatesFilter.schema.ts

const nestedstringwithaggregatesfilterSchema = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterObjectSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedStringFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedStringFilterObjectSchema).optional(),
  })
  .strict();
export const NestedStringWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  nestedstringwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;
export const NestedStringWithAggregatesFilterObjectZodSchema =
  nestedstringwithaggregatesfilterSchema;

// File: NestedIntFilter.schema.ts

const nestedintfilterSchema = z
  .object({
    equals: z.number().int().optional(),
    in: z.number().int().array().optional(),
    notIn: z.number().int().array().optional(),
    lt: z.number().int().optional(),
    lte: z.number().int().optional(),
    gt: z.number().int().optional(),
    gte: z.number().int().optional(),
    not: z.union([z.number().int(), z.lazy(() => NestedIntFilterObjectSchema)]).optional(),
  })
  .strict();
export const NestedIntFilterObjectSchema: z.ZodType<Prisma.NestedIntFilter> =
  nestedintfilterSchema as unknown as z.ZodType<Prisma.NestedIntFilter>;
export const NestedIntFilterObjectZodSchema = nestedintfilterSchema;

// File: NestedStringNullableWithAggregatesFilter.schema.ts

const nestedstringnullablewithaggregatesfilterSchema = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterObjectSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterObjectSchema).optional(),
    isSet: z.boolean().optional(),
  })
  .strict();
export const NestedStringNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  nestedstringnullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter>;
export const NestedStringNullableWithAggregatesFilterObjectZodSchema =
  nestedstringnullablewithaggregatesfilterSchema;

// File: NestedIntNullableFilter.schema.ts

const nestedintnullablefilterSchema = z
  .object({
    equals: z.number().int().optional().nullable(),
    in: z.number().int().array().optional().nullable(),
    notIn: z.number().int().array().optional().nullable(),
    lt: z.number().int().optional(),
    lte: z.number().int().optional(),
    gt: z.number().int().optional(),
    gte: z.number().int().optional(),
    not: z
      .union([z.number().int(), z.lazy(() => NestedIntNullableFilterObjectSchema)])
      .optional()
      .nullable(),
    isSet: z.boolean().optional(),
  })
  .strict();
export const NestedIntNullableFilterObjectSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  nestedintnullablefilterSchema as unknown as z.ZodType<Prisma.NestedIntNullableFilter>;
export const NestedIntNullableFilterObjectZodSchema = nestedintnullablefilterSchema;

// File: NestedDateTimeNullableWithAggregatesFilter.schema.ts

const nesteddatetimenullablewithaggregatesfilterSchema = z
  .object({
    equals: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional()
      .nullable(),
    in: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
    notIn: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
    lt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    lte: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    gt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    gte: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    not: z
      .union([
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
        z.lazy(() => NestedDateTimeNullableWithAggregatesFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional(),
    isSet: z.boolean().optional(),
  })
  .strict();
export const NestedDateTimeNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  nesteddatetimenullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter>;
export const NestedDateTimeNullableWithAggregatesFilterObjectZodSchema =
  nesteddatetimenullablewithaggregatesfilterSchema;

// File: NestedDateTimeWithAggregatesFilter.schema.ts

const nesteddatetimewithaggregatesfilterSchema = z
  .object({
    equals: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    in: z.union([z.date().array(), z.string().datetime().array()]).optional(),
    notIn: z.union([z.date().array(), z.string().datetime().array()]).optional(),
    lt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    lte: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    gt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    gte: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
      .transform((v) => new Date(v))
      .optional(),
    not: z
      .union([
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
        z.lazy(() => NestedDateTimeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
  })
  .strict();
export const NestedDateTimeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  nesteddatetimewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter>;
export const NestedDateTimeWithAggregatesFilterObjectZodSchema =
  nesteddatetimewithaggregatesfilterSchema;

// File: NestedEnumApplicationTypeFilter.schema.ts

const nestedenumapplicationtypefilterSchema = z
  .object({
    equals: ApplicationTypeSchema.optional(),
    in: ApplicationTypeSchema.array().optional(),
    notIn: ApplicationTypeSchema.array().optional(),
    not: z
      .union([ApplicationTypeSchema, z.lazy(() => NestedEnumApplicationTypeFilterObjectSchema)])
      .optional(),
  })
  .strict();
export const NestedEnumApplicationTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumApplicationTypeFilter> =
  nestedenumapplicationtypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumApplicationTypeFilter>;
export const NestedEnumApplicationTypeFilterObjectZodSchema = nestedenumapplicationtypefilterSchema;

// File: NestedEnumApplicationStatusFilter.schema.ts

const nestedenumapplicationstatusfilterSchema = z
  .object({
    equals: ApplicationStatusSchema.optional(),
    in: ApplicationStatusSchema.array().optional(),
    notIn: ApplicationStatusSchema.array().optional(),
    not: z
      .union([ApplicationStatusSchema, z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema)])
      .optional(),
  })
  .strict();
export const NestedEnumApplicationStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumApplicationStatusFilter> =
  nestedenumapplicationstatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumApplicationStatusFilter>;
export const NestedEnumApplicationStatusFilterObjectZodSchema =
  nestedenumapplicationstatusfilterSchema;

// File: NestedBoolFilter.schema.ts

const nestedboolfilterSchema = z
  .object({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterObjectSchema)]).optional(),
  })
  .strict();
export const NestedBoolFilterObjectSchema: z.ZodType<Prisma.NestedBoolFilter> =
  nestedboolfilterSchema as unknown as z.ZodType<Prisma.NestedBoolFilter>;
export const NestedBoolFilterObjectZodSchema = nestedboolfilterSchema;

// File: ApplicationEntryPointsWhereInput.schema.ts

const applicationentrypointswhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ApplicationEntryPointsWhereInputObjectSchema),
        z.lazy(() => ApplicationEntryPointsWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ApplicationEntryPointsWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ApplicationEntryPointsWhereInputObjectSchema),
        z.lazy(() => ApplicationEntryPointsWhereInputObjectSchema).array(),
      ])
      .optional(),
    frontend: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    backend: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();
export const ApplicationEntryPointsWhereInputObjectSchema: z.ZodType<Prisma.ApplicationEntryPointsWhereInput> =
  applicationentrypointswhereinputSchema as unknown as z.ZodType<Prisma.ApplicationEntryPointsWhereInput>;
export const ApplicationEntryPointsWhereInputObjectZodSchema =
  applicationentrypointswhereinputSchema;

// File: ApplicationStorageMetaWhereInput.schema.ts

const applicationstoragemetawhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ApplicationStorageMetaWhereInputObjectSchema),
        z.lazy(() => ApplicationStorageMetaWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ApplicationStorageMetaWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ApplicationStorageMetaWhereInputObjectSchema),
        z.lazy(() => ApplicationStorageMetaWhereInputObjectSchema).array(),
      ])
      .optional(),
    rootDir: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    archivePath: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    contentPath: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    manifestPath: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();
export const ApplicationStorageMetaWhereInputObjectSchema: z.ZodType<Prisma.ApplicationStorageMetaWhereInput> =
  applicationstoragemetawhereinputSchema as unknown as z.ZodType<Prisma.ApplicationStorageMetaWhereInput>;
export const ApplicationStorageMetaWhereInputObjectZodSchema =
  applicationstoragemetawhereinputSchema;

// File: NestedEnumApplicationTypeWithAggregatesFilter.schema.ts

const nestedenumapplicationtypewithaggregatesfilterSchema = z
  .object({
    equals: ApplicationTypeSchema.optional(),
    in: ApplicationTypeSchema.array().optional(),
    notIn: ApplicationTypeSchema.array().optional(),
    not: z
      .union([
        ApplicationTypeSchema,
        z.lazy(() => NestedEnumApplicationTypeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumApplicationTypeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumApplicationTypeFilterObjectSchema).optional(),
  })
  .strict();
export const NestedEnumApplicationTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumApplicationTypeWithAggregatesFilter> =
  nestedenumapplicationtypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumApplicationTypeWithAggregatesFilter>;
export const NestedEnumApplicationTypeWithAggregatesFilterObjectZodSchema =
  nestedenumapplicationtypewithaggregatesfilterSchema;

// File: NestedEnumApplicationStatusWithAggregatesFilter.schema.ts

const nestedenumapplicationstatuswithaggregatesfilterSchema = z
  .object({
    equals: ApplicationStatusSchema.optional(),
    in: ApplicationStatusSchema.array().optional(),
    notIn: ApplicationStatusSchema.array().optional(),
    not: z
      .union([
        ApplicationStatusSchema,
        z.lazy(() => NestedEnumApplicationStatusWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema).optional(),
  })
  .strict();
export const NestedEnumApplicationStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumApplicationStatusWithAggregatesFilter> =
  nestedenumapplicationstatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumApplicationStatusWithAggregatesFilter>;
export const NestedEnumApplicationStatusWithAggregatesFilterObjectZodSchema =
  nestedenumapplicationstatuswithaggregatesfilterSchema;

// File: NestedBoolWithAggregatesFilter.schema.ts

const nestedboolwithaggregatesfilterSchema = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterObjectSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterObjectSchema).optional(),
  })
  .strict();
export const NestedBoolWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  nestedboolwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedBoolWithAggregatesFilter>;
export const NestedBoolWithAggregatesFilterObjectZodSchema = nestedboolwithaggregatesfilterSchema;

// File: NestedJsonNullableFilter.schema.ts
const __makeSchema_NestedJsonNullableFilter_schema = () =>
  z
    .object({
      equals: jsonSchema.optional().nullable(),
      not: jsonSchema.optional().nullable(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const NestedJsonNullableFilterObjectSchema: z.ZodType<Prisma.NestedJsonNullableFilter> =
  __makeSchema_NestedJsonNullableFilter_schema() as unknown as z.ZodType<Prisma.NestedJsonNullableFilter>;
export const NestedJsonNullableFilterObjectZodSchema =
  __makeSchema_NestedJsonNullableFilter_schema();

// File: NestedEnumLanguageFilter.schema.ts

const nestedenumlanguagefilterSchema = z
  .object({
    equals: LanguageSchema.optional(),
    in: LanguageSchema.array().optional(),
    notIn: LanguageSchema.array().optional(),
    not: z.union([LanguageSchema, z.lazy(() => NestedEnumLanguageFilterObjectSchema)]).optional(),
  })
  .strict();
export const NestedEnumLanguageFilterObjectSchema: z.ZodType<Prisma.NestedEnumLanguageFilter> =
  nestedenumlanguagefilterSchema as unknown as z.ZodType<Prisma.NestedEnumLanguageFilter>;
export const NestedEnumLanguageFilterObjectZodSchema = nestedenumlanguagefilterSchema;

// File: NestedEnumThemeFilter.schema.ts

const nestedenumthemefilterSchema = z
  .object({
    equals: ThemeSchema.optional(),
    in: ThemeSchema.array().optional(),
    notIn: ThemeSchema.array().optional(),
    not: z.union([ThemeSchema, z.lazy(() => NestedEnumThemeFilterObjectSchema)]).optional(),
  })
  .strict();
export const NestedEnumThemeFilterObjectSchema: z.ZodType<Prisma.NestedEnumThemeFilter> =
  nestedenumthemefilterSchema as unknown as z.ZodType<Prisma.NestedEnumThemeFilter>;
export const NestedEnumThemeFilterObjectZodSchema = nestedenumthemefilterSchema;

// File: NestedEnumIdleModeFilter.schema.ts

const nestedenumidlemodefilterSchema = z
  .object({
    equals: IdleModeSchema.optional(),
    in: IdleModeSchema.array().optional(),
    notIn: IdleModeSchema.array().optional(),
    not: z.union([IdleModeSchema, z.lazy(() => NestedEnumIdleModeFilterObjectSchema)]).optional(),
  })
  .strict();
export const NestedEnumIdleModeFilterObjectSchema: z.ZodType<Prisma.NestedEnumIdleModeFilter> =
  nestedenumidlemodefilterSchema as unknown as z.ZodType<Prisma.NestedEnumIdleModeFilter>;
export const NestedEnumIdleModeFilterObjectZodSchema = nestedenumidlemodefilterSchema;

// File: ModelSceneSettingsWhereInput.schema.ts

const modelscenesettingswhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ModelSceneSettingsWhereInputObjectSchema),
        z.lazy(() => ModelSceneSettingsWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ModelSceneSettingsWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ModelSceneSettingsWhereInputObjectSchema),
        z.lazy(() => ModelSceneSettingsWhereInputObjectSchema).array(),
      ])
      .optional(),
    modelPath: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    sceneName: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    enableToonShader: z
      .union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
      .optional()
      .nullable(),
    lightIntensity: z
      .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    cameraDistance: z
      .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    animationSpeed: z
      .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
  })
  .strict();
export const ModelSceneSettingsWhereInputObjectSchema: z.ZodType<Prisma.ModelSceneSettingsWhereInput> =
  modelscenesettingswhereinputSchema as unknown as z.ZodType<Prisma.ModelSceneSettingsWhereInput>;
export const ModelSceneSettingsWhereInputObjectZodSchema = modelscenesettingswhereinputSchema;

// File: NestedIntWithAggregatesFilter.schema.ts

const nestedintwithaggregatesfilterSchema = z
  .object({
    equals: z.number().int().optional(),
    in: z.number().int().array().optional(),
    notIn: z.number().int().array().optional(),
    lt: z.number().int().optional(),
    lte: z.number().int().optional(),
    gt: z.number().int().optional(),
    gte: z.number().int().optional(),
    not: z
      .union([z.number().int(), z.lazy(() => NestedIntWithAggregatesFilterObjectSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterObjectSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  })
  .strict();
export const NestedIntWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  nestedintwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedIntWithAggregatesFilter>;
export const NestedIntWithAggregatesFilterObjectZodSchema = nestedintwithaggregatesfilterSchema;

// File: NestedFloatFilter.schema.ts

const nestedfloatfilterSchema = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatFilterObjectSchema)]).optional(),
  })
  .strict();
export const NestedFloatFilterObjectSchema: z.ZodType<Prisma.NestedFloatFilter> =
  nestedfloatfilterSchema as unknown as z.ZodType<Prisma.NestedFloatFilter>;
export const NestedFloatFilterObjectZodSchema = nestedfloatfilterSchema;

// File: NestedEnumLanguageWithAggregatesFilter.schema.ts

const nestedenumlanguagewithaggregatesfilterSchema = z
  .object({
    equals: LanguageSchema.optional(),
    in: LanguageSchema.array().optional(),
    notIn: LanguageSchema.array().optional(),
    not: z
      .union([LanguageSchema, z.lazy(() => NestedEnumLanguageWithAggregatesFilterObjectSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumLanguageFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumLanguageFilterObjectSchema).optional(),
  })
  .strict();
export const NestedEnumLanguageWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumLanguageWithAggregatesFilter> =
  nestedenumlanguagewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumLanguageWithAggregatesFilter>;
export const NestedEnumLanguageWithAggregatesFilterObjectZodSchema =
  nestedenumlanguagewithaggregatesfilterSchema;

// File: NestedEnumThemeWithAggregatesFilter.schema.ts

const nestedenumthemewithaggregatesfilterSchema = z
  .object({
    equals: ThemeSchema.optional(),
    in: ThemeSchema.array().optional(),
    notIn: ThemeSchema.array().optional(),
    not: z
      .union([ThemeSchema, z.lazy(() => NestedEnumThemeWithAggregatesFilterObjectSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumThemeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumThemeFilterObjectSchema).optional(),
  })
  .strict();
export const NestedEnumThemeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumThemeWithAggregatesFilter> =
  nestedenumthemewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumThemeWithAggregatesFilter>;
export const NestedEnumThemeWithAggregatesFilterObjectZodSchema =
  nestedenumthemewithaggregatesfilterSchema;

// File: NestedEnumIdleModeWithAggregatesFilter.schema.ts

const nestedenumidlemodewithaggregatesfilterSchema = z
  .object({
    equals: IdleModeSchema.optional(),
    in: IdleModeSchema.array().optional(),
    notIn: IdleModeSchema.array().optional(),
    not: z
      .union([IdleModeSchema, z.lazy(() => NestedEnumIdleModeWithAggregatesFilterObjectSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumIdleModeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumIdleModeFilterObjectSchema).optional(),
  })
  .strict();
export const NestedEnumIdleModeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumIdleModeWithAggregatesFilter> =
  nestedenumidlemodewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumIdleModeWithAggregatesFilter>;
export const NestedEnumIdleModeWithAggregatesFilterObjectZodSchema =
  nestedenumidlemodewithaggregatesfilterSchema;

// File: ChatMessageWhereInput.schema.ts

const chatmessagewhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ChatMessageWhereInputObjectSchema),
        z.lazy(() => ChatMessageWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ChatMessageWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ChatMessageWhereInputObjectSchema),
        z.lazy(() => ChatMessageWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    position: z
      .union([z.lazy(() => EnumMessagePositionFilterObjectSchema), MessagePositionSchema])
      .optional(),
    type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    text: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    date: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
  })
  .strict();
export const ChatMessageWhereInputObjectSchema: z.ZodType<Prisma.ChatMessageWhereInput> =
  chatmessagewhereinputSchema as unknown as z.ZodType<Prisma.ChatMessageWhereInput>;
export const ChatMessageWhereInputObjectZodSchema = chatmessagewhereinputSchema;

// File: ApplicationCreateWithoutOwnerInput.schema.ts
const __makeSchema_ApplicationCreateWithoutOwnerInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      key: z.string(),
      name: z.string(),
      version: z.string(),
      type: ApplicationTypeSchema,
      description: z.string().optional().nullable(),
      status: ApplicationStatusSchema.optional(),
      isPublished: z.boolean().optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationCreatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
      icon: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      versions: z
        .lazy(() => ApplicationVersionCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
      userInstalls: z
        .lazy(() => UserApplicationCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationCreateWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationCreateWithoutOwnerInput> =
  __makeSchema_ApplicationCreateWithoutOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateWithoutOwnerInput>;
export const ApplicationCreateWithoutOwnerInputObjectZodSchema =
  __makeSchema_ApplicationCreateWithoutOwnerInput_schema();

// File: ApplicationUncheckedCreateWithoutOwnerInput.schema.ts
const __makeSchema_ApplicationUncheckedCreateWithoutOwnerInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      key: z.string(),
      name: z.string(),
      version: z.string(),
      type: ApplicationTypeSchema,
      description: z.string().optional().nullable(),
      status: ApplicationStatusSchema.optional(),
      isPublished: z.boolean().optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationCreatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
      icon: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      versions: z
        .lazy(() => ApplicationVersionUncheckedCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
      userInstalls: z
        .lazy(() => UserApplicationUncheckedCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUncheckedCreateWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedCreateWithoutOwnerInput> =
  __makeSchema_ApplicationUncheckedCreateWithoutOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedCreateWithoutOwnerInput>;
export const ApplicationUncheckedCreateWithoutOwnerInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedCreateWithoutOwnerInput_schema();

// File: ApplicationCreateOrConnectWithoutOwnerInput.schema.ts
const __makeSchema_ApplicationCreateOrConnectWithoutOwnerInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ApplicationCreateWithoutOwnerInputObjectSchema),
        z.lazy(() => ApplicationUncheckedCreateWithoutOwnerInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationCreateOrConnectWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationCreateOrConnectWithoutOwnerInput> =
  __makeSchema_ApplicationCreateOrConnectWithoutOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateOrConnectWithoutOwnerInput>;
export const ApplicationCreateOrConnectWithoutOwnerInputObjectZodSchema =
  __makeSchema_ApplicationCreateOrConnectWithoutOwnerInput_schema();

// File: ApplicationCreateManyOwnerInputEnvelope.schema.ts
const __makeSchema_ApplicationCreateManyOwnerInputEnvelope_schema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => ApplicationCreateManyOwnerInputObjectSchema),
        z.lazy(() => ApplicationCreateManyOwnerInputObjectSchema).array(),
      ]),
    })
    .strict();
export const ApplicationCreateManyOwnerInputEnvelopeObjectSchema: z.ZodType<Prisma.ApplicationCreateManyOwnerInputEnvelope> =
  __makeSchema_ApplicationCreateManyOwnerInputEnvelope_schema() as unknown as z.ZodType<Prisma.ApplicationCreateManyOwnerInputEnvelope>;
export const ApplicationCreateManyOwnerInputEnvelopeObjectZodSchema =
  __makeSchema_ApplicationCreateManyOwnerInputEnvelope_schema();

// File: UserApplicationCreateWithoutUserInput.schema.ts
const __makeSchema_UserApplicationCreateWithoutUserInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      application: z.lazy(() => ApplicationCreateNestedOneWithoutUserInstallsInputObjectSchema),
    })
    .strict();
export const UserApplicationCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserApplicationCreateWithoutUserInput> =
  __makeSchema_UserApplicationCreateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateWithoutUserInput>;
export const UserApplicationCreateWithoutUserInputObjectZodSchema =
  __makeSchema_UserApplicationCreateWithoutUserInput_schema();

// File: UserApplicationUncheckedCreateWithoutUserInput.schema.ts
const __makeSchema_UserApplicationUncheckedCreateWithoutUserInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      applicationId: z.string(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedCreateWithoutUserInput> =
  __makeSchema_UserApplicationUncheckedCreateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedCreateWithoutUserInput>;
export const UserApplicationUncheckedCreateWithoutUserInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedCreateWithoutUserInput_schema();

// File: UserApplicationCreateOrConnectWithoutUserInput.schema.ts
const __makeSchema_UserApplicationCreateOrConnectWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserApplicationCreateWithoutUserInputObjectSchema),
        z.lazy(() => UserApplicationUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const UserApplicationCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.UserApplicationCreateOrConnectWithoutUserInput> =
  __makeSchema_UserApplicationCreateOrConnectWithoutUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateOrConnectWithoutUserInput>;
export const UserApplicationCreateOrConnectWithoutUserInputObjectZodSchema =
  __makeSchema_UserApplicationCreateOrConnectWithoutUserInput_schema();

// File: UserApplicationCreateManyUserInputEnvelope.schema.ts
const __makeSchema_UserApplicationCreateManyUserInputEnvelope_schema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => UserApplicationCreateManyUserInputObjectSchema),
        z.lazy(() => UserApplicationCreateManyUserInputObjectSchema).array(),
      ]),
    })
    .strict();
export const UserApplicationCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.UserApplicationCreateManyUserInputEnvelope> =
  __makeSchema_UserApplicationCreateManyUserInputEnvelope_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateManyUserInputEnvelope>;
export const UserApplicationCreateManyUserInputEnvelopeObjectZodSchema =
  __makeSchema_UserApplicationCreateManyUserInputEnvelope_schema();

// File: ApiKeyCreateWithoutUserInput.schema.ts
const __makeSchema_ApiKeyCreateWithoutUserInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      provider: z.string(),
      encryptedKey: z.string(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const ApiKeyCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ApiKeyCreateWithoutUserInput> =
  __makeSchema_ApiKeyCreateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyCreateWithoutUserInput>;
export const ApiKeyCreateWithoutUserInputObjectZodSchema =
  __makeSchema_ApiKeyCreateWithoutUserInput_schema();

// File: ApiKeyUncheckedCreateWithoutUserInput.schema.ts
const __makeSchema_ApiKeyUncheckedCreateWithoutUserInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      provider: z.string(),
      encryptedKey: z.string(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const ApiKeyUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ApiKeyUncheckedCreateWithoutUserInput> =
  __makeSchema_ApiKeyUncheckedCreateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUncheckedCreateWithoutUserInput>;
export const ApiKeyUncheckedCreateWithoutUserInputObjectZodSchema =
  __makeSchema_ApiKeyUncheckedCreateWithoutUserInput_schema();

// File: ApiKeyCreateOrConnectWithoutUserInput.schema.ts
const __makeSchema_ApiKeyCreateOrConnectWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ApiKeyCreateWithoutUserInputObjectSchema),
        z.lazy(() => ApiKeyUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const ApiKeyCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ApiKeyCreateOrConnectWithoutUserInput> =
  __makeSchema_ApiKeyCreateOrConnectWithoutUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyCreateOrConnectWithoutUserInput>;
export const ApiKeyCreateOrConnectWithoutUserInputObjectZodSchema =
  __makeSchema_ApiKeyCreateOrConnectWithoutUserInput_schema();

// File: ApiKeyCreateManyUserInputEnvelope.schema.ts
const __makeSchema_ApiKeyCreateManyUserInputEnvelope_schema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => ApiKeyCreateManyUserInputObjectSchema),
        z.lazy(() => ApiKeyCreateManyUserInputObjectSchema).array(),
      ]),
    })
    .strict();
export const ApiKeyCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ApiKeyCreateManyUserInputEnvelope> =
  __makeSchema_ApiKeyCreateManyUserInputEnvelope_schema() as unknown as z.ZodType<Prisma.ApiKeyCreateManyUserInputEnvelope>;
export const ApiKeyCreateManyUserInputEnvelopeObjectZodSchema =
  __makeSchema_ApiKeyCreateManyUserInputEnvelope_schema();

// File: SettingsCreateWithoutUserInput.schema.ts
const __makeSchema_SettingsCreateWithoutUserInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      volume: z.number().int().optional(),
      language: LanguageSchema.optional(),
      theme: ThemeSchema.optional(),
      accentColorLight: z.string().optional(),
      accentColorDark: z.string().optional(),
      sttProviderName: z.string().optional().nullable(),
      llmProviderName: z.string().optional().nullable(),
      llmModel: z.string().optional().nullable(),
      ttsProviderName: z.string().optional().nullable(),
      welcomeTitle: z.string().optional(),
      idleTimeoutSeconds: z.number().int().optional(),
      idleMode: IdleModeSchema.optional(),
      idleCustomImagePath: z.string().optional(),
      idleRemoteEndpoint: z.string().optional(),
      modelScene: z
        .union([
          z.lazy(() => ModelSceneSettingsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const SettingsCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.SettingsCreateWithoutUserInput> =
  __makeSchema_SettingsCreateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.SettingsCreateWithoutUserInput>;
export const SettingsCreateWithoutUserInputObjectZodSchema =
  __makeSchema_SettingsCreateWithoutUserInput_schema();

// File: SettingsUncheckedCreateWithoutUserInput.schema.ts
const __makeSchema_SettingsUncheckedCreateWithoutUserInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      volume: z.number().int().optional(),
      language: LanguageSchema.optional(),
      theme: ThemeSchema.optional(),
      accentColorLight: z.string().optional(),
      accentColorDark: z.string().optional(),
      sttProviderName: z.string().optional().nullable(),
      llmProviderName: z.string().optional().nullable(),
      llmModel: z.string().optional().nullable(),
      ttsProviderName: z.string().optional().nullable(),
      welcomeTitle: z.string().optional(),
      idleTimeoutSeconds: z.number().int().optional(),
      idleMode: IdleModeSchema.optional(),
      idleCustomImagePath: z.string().optional(),
      idleRemoteEndpoint: z.string().optional(),
      modelScene: z
        .union([
          z.lazy(() => ModelSceneSettingsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const SettingsUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.SettingsUncheckedCreateWithoutUserInput> =
  __makeSchema_SettingsUncheckedCreateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.SettingsUncheckedCreateWithoutUserInput>;
export const SettingsUncheckedCreateWithoutUserInputObjectZodSchema =
  __makeSchema_SettingsUncheckedCreateWithoutUserInput_schema();

// File: SettingsCreateOrConnectWithoutUserInput.schema.ts
const __makeSchema_SettingsCreateOrConnectWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => SettingsWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => SettingsCreateWithoutUserInputObjectSchema),
        z.lazy(() => SettingsUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const SettingsCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.SettingsCreateOrConnectWithoutUserInput> =
  __makeSchema_SettingsCreateOrConnectWithoutUserInput_schema() as unknown as z.ZodType<Prisma.SettingsCreateOrConnectWithoutUserInput>;
export const SettingsCreateOrConnectWithoutUserInputObjectZodSchema =
  __makeSchema_SettingsCreateOrConnectWithoutUserInput_schema();

// File: DialogCreateWithoutUserInput.schema.ts
const __makeSchema_DialogCreateWithoutUserInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      dialogId: z.string(),
      title: z.string(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListCreateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const DialogCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.DialogCreateWithoutUserInput> =
  __makeSchema_DialogCreateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.DialogCreateWithoutUserInput>;
export const DialogCreateWithoutUserInputObjectZodSchema =
  __makeSchema_DialogCreateWithoutUserInput_schema();

// File: DialogUncheckedCreateWithoutUserInput.schema.ts
const __makeSchema_DialogUncheckedCreateWithoutUserInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      dialogId: z.string(),
      title: z.string(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListCreateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const DialogUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.DialogUncheckedCreateWithoutUserInput> =
  __makeSchema_DialogUncheckedCreateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.DialogUncheckedCreateWithoutUserInput>;
export const DialogUncheckedCreateWithoutUserInputObjectZodSchema =
  __makeSchema_DialogUncheckedCreateWithoutUserInput_schema();

// File: DialogCreateOrConnectWithoutUserInput.schema.ts
const __makeSchema_DialogCreateOrConnectWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => DialogWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => DialogCreateWithoutUserInputObjectSchema),
        z.lazy(() => DialogUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const DialogCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.DialogCreateOrConnectWithoutUserInput> =
  __makeSchema_DialogCreateOrConnectWithoutUserInput_schema() as unknown as z.ZodType<Prisma.DialogCreateOrConnectWithoutUserInput>;
export const DialogCreateOrConnectWithoutUserInputObjectZodSchema =
  __makeSchema_DialogCreateOrConnectWithoutUserInput_schema();

// File: DialogCreateManyUserInputEnvelope.schema.ts
const __makeSchema_DialogCreateManyUserInputEnvelope_schema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => DialogCreateManyUserInputObjectSchema),
        z.lazy(() => DialogCreateManyUserInputObjectSchema).array(),
      ]),
    })
    .strict();
export const DialogCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.DialogCreateManyUserInputEnvelope> =
  __makeSchema_DialogCreateManyUserInputEnvelope_schema() as unknown as z.ZodType<Prisma.DialogCreateManyUserInputEnvelope>;
export const DialogCreateManyUserInputEnvelopeObjectZodSchema =
  __makeSchema_DialogCreateManyUserInputEnvelope_schema();

// File: OAuthProviderUpdateManyInput.schema.ts
const __makeSchema_OAuthProviderUpdateManyInput_schema = () =>
  z
    .object({
      where: z.lazy(() => OAuthProviderWhereInputObjectSchema),
      data: z.lazy(() => OAuthProviderUpdateInputObjectSchema),
    })
    .strict();
export const OAuthProviderUpdateManyInputObjectSchema: z.ZodType<Prisma.OAuthProviderUpdateManyInput> =
  __makeSchema_OAuthProviderUpdateManyInput_schema() as unknown as z.ZodType<Prisma.OAuthProviderUpdateManyInput>;
export const OAuthProviderUpdateManyInputObjectZodSchema =
  __makeSchema_OAuthProviderUpdateManyInput_schema();

// File: OAuthProviderDeleteManyInput.schema.ts
const __makeSchema_OAuthProviderDeleteManyInput_schema = () =>
  z
    .object({
      where: z.lazy(() => OAuthProviderWhereInputObjectSchema),
    })
    .strict();
export const OAuthProviderDeleteManyInputObjectSchema: z.ZodType<Prisma.OAuthProviderDeleteManyInput> =
  __makeSchema_OAuthProviderDeleteManyInput_schema() as unknown as z.ZodType<Prisma.OAuthProviderDeleteManyInput>;
export const OAuthProviderDeleteManyInputObjectZodSchema =
  __makeSchema_OAuthProviderDeleteManyInput_schema();

// File: ApplicationUpsertWithWhereUniqueWithoutOwnerInput.schema.ts
const __makeSchema_ApplicationUpsertWithWhereUniqueWithoutOwnerInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ApplicationUpdateWithoutOwnerInputObjectSchema),
        z.lazy(() => ApplicationUncheckedUpdateWithoutOwnerInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ApplicationCreateWithoutOwnerInputObjectSchema),
        z.lazy(() => ApplicationUncheckedCreateWithoutOwnerInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationUpsertWithWhereUniqueWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationUpsertWithWhereUniqueWithoutOwnerInput> =
  __makeSchema_ApplicationUpsertWithWhereUniqueWithoutOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpsertWithWhereUniqueWithoutOwnerInput>;
export const ApplicationUpsertWithWhereUniqueWithoutOwnerInputObjectZodSchema =
  __makeSchema_ApplicationUpsertWithWhereUniqueWithoutOwnerInput_schema();

// File: ApplicationUpdateWithWhereUniqueWithoutOwnerInput.schema.ts
const __makeSchema_ApplicationUpdateWithWhereUniqueWithoutOwnerInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ApplicationUpdateWithoutOwnerInputObjectSchema),
        z.lazy(() => ApplicationUncheckedUpdateWithoutOwnerInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationUpdateWithWhereUniqueWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateWithWhereUniqueWithoutOwnerInput> =
  __makeSchema_ApplicationUpdateWithWhereUniqueWithoutOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateWithWhereUniqueWithoutOwnerInput>;
export const ApplicationUpdateWithWhereUniqueWithoutOwnerInputObjectZodSchema =
  __makeSchema_ApplicationUpdateWithWhereUniqueWithoutOwnerInput_schema();

// File: ApplicationUpdateManyWithWhereWithoutOwnerInput.schema.ts
const __makeSchema_ApplicationUpdateManyWithWhereWithoutOwnerInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ApplicationUpdateManyMutationInputObjectSchema),
        z.lazy(() => ApplicationUncheckedUpdateManyWithoutOwnerInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationUpdateManyWithWhereWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateManyWithWhereWithoutOwnerInput> =
  __makeSchema_ApplicationUpdateManyWithWhereWithoutOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateManyWithWhereWithoutOwnerInput>;
export const ApplicationUpdateManyWithWhereWithoutOwnerInputObjectZodSchema =
  __makeSchema_ApplicationUpdateManyWithWhereWithoutOwnerInput_schema();

// File: ApplicationScalarWhereInput.schema.ts

const applicationscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ApplicationScalarWhereInputObjectSchema),
        z.lazy(() => ApplicationScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ApplicationScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ApplicationScalarWhereInputObjectSchema),
        z.lazy(() => ApplicationScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    key: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    version: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    type: z
      .union([z.lazy(() => EnumApplicationTypeFilterObjectSchema), ApplicationTypeSchema])
      .optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    status: z
      .union([z.lazy(() => EnumApplicationStatusFilterObjectSchema), ApplicationStatusSchema])
      .optional(),
    isPublished: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
    ownerId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    permissions: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    manifest: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    icon: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
  })
  .strict();
export const ApplicationScalarWhereInputObjectSchema: z.ZodType<Prisma.ApplicationScalarWhereInput> =
  applicationscalarwhereinputSchema as unknown as z.ZodType<Prisma.ApplicationScalarWhereInput>;
export const ApplicationScalarWhereInputObjectZodSchema = applicationscalarwhereinputSchema;

// File: UserApplicationUpsertWithWhereUniqueWithoutUserInput.schema.ts
const __makeSchema_UserApplicationUpsertWithWhereUniqueWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => UserApplicationUpdateWithoutUserInputObjectSchema),
        z.lazy(() => UserApplicationUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserApplicationCreateWithoutUserInputObjectSchema),
        z.lazy(() => UserApplicationUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const UserApplicationUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.UserApplicationUpsertWithWhereUniqueWithoutUserInput> =
  __makeSchema_UserApplicationUpsertWithWhereUniqueWithoutUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpsertWithWhereUniqueWithoutUserInput>;
export const UserApplicationUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  __makeSchema_UserApplicationUpsertWithWhereUniqueWithoutUserInput_schema();

// File: UserApplicationUpdateWithWhereUniqueWithoutUserInput.schema.ts
const __makeSchema_UserApplicationUpdateWithWhereUniqueWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => UserApplicationUpdateWithoutUserInputObjectSchema),
        z.lazy(() => UserApplicationUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const UserApplicationUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.UserApplicationUpdateWithWhereUniqueWithoutUserInput> =
  __makeSchema_UserApplicationUpdateWithWhereUniqueWithoutUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpdateWithWhereUniqueWithoutUserInput>;
export const UserApplicationUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
  __makeSchema_UserApplicationUpdateWithWhereUniqueWithoutUserInput_schema();

// File: UserApplicationUpdateManyWithWhereWithoutUserInput.schema.ts
const __makeSchema_UserApplicationUpdateManyWithWhereWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserApplicationScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => UserApplicationUpdateManyMutationInputObjectSchema),
        z.lazy(() => UserApplicationUncheckedUpdateManyWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const UserApplicationUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.UserApplicationUpdateManyWithWhereWithoutUserInput> =
  __makeSchema_UserApplicationUpdateManyWithWhereWithoutUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpdateManyWithWhereWithoutUserInput>;
export const UserApplicationUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  __makeSchema_UserApplicationUpdateManyWithWhereWithoutUserInput_schema();

// File: UserApplicationScalarWhereInput.schema.ts

const userapplicationscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserApplicationScalarWhereInputObjectSchema),
        z.lazy(() => UserApplicationScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserApplicationScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserApplicationScalarWhereInputObjectSchema),
        z.lazy(() => UserApplicationScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    applicationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
  })
  .strict();
export const UserApplicationScalarWhereInputObjectSchema: z.ZodType<Prisma.UserApplicationScalarWhereInput> =
  userapplicationscalarwhereinputSchema as unknown as z.ZodType<Prisma.UserApplicationScalarWhereInput>;
export const UserApplicationScalarWhereInputObjectZodSchema = userapplicationscalarwhereinputSchema;

// File: ApiKeyUpsertWithWhereUniqueWithoutUserInput.schema.ts
const __makeSchema_ApiKeyUpsertWithWhereUniqueWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ApiKeyUpdateWithoutUserInputObjectSchema),
        z.lazy(() => ApiKeyUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ApiKeyCreateWithoutUserInputObjectSchema),
        z.lazy(() => ApiKeyUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const ApiKeyUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ApiKeyUpsertWithWhereUniqueWithoutUserInput> =
  __makeSchema_ApiKeyUpsertWithWhereUniqueWithoutUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUpsertWithWhereUniqueWithoutUserInput>;
export const ApiKeyUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  __makeSchema_ApiKeyUpsertWithWhereUniqueWithoutUserInput_schema();

// File: ApiKeyUpdateWithWhereUniqueWithoutUserInput.schema.ts
const __makeSchema_ApiKeyUpdateWithWhereUniqueWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApiKeyWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ApiKeyUpdateWithoutUserInputObjectSchema),
        z.lazy(() => ApiKeyUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const ApiKeyUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ApiKeyUpdateWithWhereUniqueWithoutUserInput> =
  __makeSchema_ApiKeyUpdateWithWhereUniqueWithoutUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUpdateWithWhereUniqueWithoutUserInput>;
export const ApiKeyUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
  __makeSchema_ApiKeyUpdateWithWhereUniqueWithoutUserInput_schema();

// File: ApiKeyUpdateManyWithWhereWithoutUserInput.schema.ts
const __makeSchema_ApiKeyUpdateManyWithWhereWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApiKeyScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ApiKeyUpdateManyMutationInputObjectSchema),
        z.lazy(() => ApiKeyUncheckedUpdateManyWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const ApiKeyUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ApiKeyUpdateManyWithWhereWithoutUserInput> =
  __makeSchema_ApiKeyUpdateManyWithWhereWithoutUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUpdateManyWithWhereWithoutUserInput>;
export const ApiKeyUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  __makeSchema_ApiKeyUpdateManyWithWhereWithoutUserInput_schema();

// File: ApiKeyScalarWhereInput.schema.ts

const apikeyscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ApiKeyScalarWhereInputObjectSchema),
        z.lazy(() => ApiKeyScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ApiKeyScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ApiKeyScalarWhereInputObjectSchema),
        z.lazy(() => ApiKeyScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    provider: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    encryptedKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
  })
  .strict();
export const ApiKeyScalarWhereInputObjectSchema: z.ZodType<Prisma.ApiKeyScalarWhereInput> =
  apikeyscalarwhereinputSchema as unknown as z.ZodType<Prisma.ApiKeyScalarWhereInput>;
export const ApiKeyScalarWhereInputObjectZodSchema = apikeyscalarwhereinputSchema;

// File: SettingsUpsertWithoutUserInput.schema.ts
const __makeSchema_SettingsUpsertWithoutUserInput_schema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => SettingsUpdateWithoutUserInputObjectSchema),
        z.lazy(() => SettingsUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => SettingsCreateWithoutUserInputObjectSchema),
        z.lazy(() => SettingsUncheckedCreateWithoutUserInputObjectSchema),
      ]),
      where: z.lazy(() => SettingsWhereInputObjectSchema).optional(),
    })
    .strict();
export const SettingsUpsertWithoutUserInputObjectSchema: z.ZodType<Prisma.SettingsUpsertWithoutUserInput> =
  __makeSchema_SettingsUpsertWithoutUserInput_schema() as unknown as z.ZodType<Prisma.SettingsUpsertWithoutUserInput>;
export const SettingsUpsertWithoutUserInputObjectZodSchema =
  __makeSchema_SettingsUpsertWithoutUserInput_schema();

// File: SettingsUpdateToOneWithWhereWithoutUserInput.schema.ts
const __makeSchema_SettingsUpdateToOneWithWhereWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => SettingsWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => SettingsUpdateWithoutUserInputObjectSchema),
        z.lazy(() => SettingsUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const SettingsUpdateToOneWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.SettingsUpdateToOneWithWhereWithoutUserInput> =
  __makeSchema_SettingsUpdateToOneWithWhereWithoutUserInput_schema() as unknown as z.ZodType<Prisma.SettingsUpdateToOneWithWhereWithoutUserInput>;
export const SettingsUpdateToOneWithWhereWithoutUserInputObjectZodSchema =
  __makeSchema_SettingsUpdateToOneWithWhereWithoutUserInput_schema();

// File: SettingsUpdateWithoutUserInput.schema.ts
const __makeSchema_SettingsUpdateWithoutUserInput_schema = () =>
  z
    .object({
      volume: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      language: z
        .union([LanguageSchema, z.lazy(() => EnumLanguageFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      theme: z
        .union([ThemeSchema, z.lazy(() => EnumThemeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorLight: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorDark: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      sttProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmModel: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      ttsProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      welcomeTitle: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleTimeoutSeconds: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleMode: z
        .union([IdleModeSchema, z.lazy(() => EnumIdleModeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleCustomImagePath: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleRemoteEndpoint: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      modelScene: z
        .union([
          z.lazy(() => ModelSceneSettingsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const SettingsUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.SettingsUpdateWithoutUserInput> =
  __makeSchema_SettingsUpdateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.SettingsUpdateWithoutUserInput>;
export const SettingsUpdateWithoutUserInputObjectZodSchema =
  __makeSchema_SettingsUpdateWithoutUserInput_schema();

// File: SettingsUncheckedUpdateWithoutUserInput.schema.ts
const __makeSchema_SettingsUncheckedUpdateWithoutUserInput_schema = () =>
  z
    .object({
      volume: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      language: z
        .union([LanguageSchema, z.lazy(() => EnumLanguageFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      theme: z
        .union([ThemeSchema, z.lazy(() => EnumThemeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorLight: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      accentColorDark: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      sttProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      llmModel: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      ttsProviderName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      welcomeTitle: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleTimeoutSeconds: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleMode: z
        .union([IdleModeSchema, z.lazy(() => EnumIdleModeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleCustomImagePath: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      idleRemoteEndpoint: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      modelScene: z
        .union([
          z.lazy(() => ModelSceneSettingsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const SettingsUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.SettingsUncheckedUpdateWithoutUserInput> =
  __makeSchema_SettingsUncheckedUpdateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.SettingsUncheckedUpdateWithoutUserInput>;
export const SettingsUncheckedUpdateWithoutUserInputObjectZodSchema =
  __makeSchema_SettingsUncheckedUpdateWithoutUserInput_schema();

// File: DialogUpsertWithWhereUniqueWithoutUserInput.schema.ts
const __makeSchema_DialogUpsertWithWhereUniqueWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => DialogWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => DialogUpdateWithoutUserInputObjectSchema),
        z.lazy(() => DialogUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => DialogCreateWithoutUserInputObjectSchema),
        z.lazy(() => DialogUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const DialogUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.DialogUpsertWithWhereUniqueWithoutUserInput> =
  __makeSchema_DialogUpsertWithWhereUniqueWithoutUserInput_schema() as unknown as z.ZodType<Prisma.DialogUpsertWithWhereUniqueWithoutUserInput>;
export const DialogUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  __makeSchema_DialogUpsertWithWhereUniqueWithoutUserInput_schema();

// File: DialogUpdateWithWhereUniqueWithoutUserInput.schema.ts
const __makeSchema_DialogUpdateWithWhereUniqueWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => DialogWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => DialogUpdateWithoutUserInputObjectSchema),
        z.lazy(() => DialogUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const DialogUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.DialogUpdateWithWhereUniqueWithoutUserInput> =
  __makeSchema_DialogUpdateWithWhereUniqueWithoutUserInput_schema() as unknown as z.ZodType<Prisma.DialogUpdateWithWhereUniqueWithoutUserInput>;
export const DialogUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
  __makeSchema_DialogUpdateWithWhereUniqueWithoutUserInput_schema();

// File: DialogUpdateManyWithWhereWithoutUserInput.schema.ts
const __makeSchema_DialogUpdateManyWithWhereWithoutUserInput_schema = () =>
  z
    .object({
      where: z.lazy(() => DialogScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => DialogUpdateManyMutationInputObjectSchema),
        z.lazy(() => DialogUncheckedUpdateManyWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const DialogUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.DialogUpdateManyWithWhereWithoutUserInput> =
  __makeSchema_DialogUpdateManyWithWhereWithoutUserInput_schema() as unknown as z.ZodType<Prisma.DialogUpdateManyWithWhereWithoutUserInput>;
export const DialogUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  __makeSchema_DialogUpdateManyWithWhereWithoutUserInput_schema();

// File: DialogScalarWhereInput.schema.ts

const dialogscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => DialogScalarWhereInputObjectSchema),
        z.lazy(() => DialogScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DialogScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DialogScalarWhereInputObjectSchema),
        z.lazy(() => DialogScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    dialogId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
  })
  .strict();
export const DialogScalarWhereInputObjectSchema: z.ZodType<Prisma.DialogScalarWhereInput> =
  dialogscalarwhereinputSchema as unknown as z.ZodType<Prisma.DialogScalarWhereInput>;
export const DialogScalarWhereInputObjectZodSchema = dialogscalarwhereinputSchema;

// File: UserCreateWithoutApplicationsInput.schema.ts
const __makeSchema_UserCreateWithoutApplicationsInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      installs: z
        .lazy(() => UserApplicationCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyCreateNestedManyWithoutUserInputObjectSchema).optional(),
      settings: z.lazy(() => SettingsCreateNestedOneWithoutUserInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogCreateNestedManyWithoutUserInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutApplicationsInput> =
  __makeSchema_UserCreateWithoutApplicationsInput_schema() as unknown as z.ZodType<Prisma.UserCreateWithoutApplicationsInput>;
export const UserCreateWithoutApplicationsInputObjectZodSchema =
  __makeSchema_UserCreateWithoutApplicationsInput_schema();

// File: UserUncheckedCreateWithoutApplicationsInput.schema.ts
const __makeSchema_UserUncheckedCreateWithoutApplicationsInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      installs: z
        .lazy(() => UserApplicationUncheckedCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
      settings: z
        .lazy(() => SettingsUncheckedCreateNestedOneWithoutUserInputObjectSchema)
        .optional(),
      dialogs: z.lazy(() => DialogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
    })
    .strict();
export const UserUncheckedCreateWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutApplicationsInput> =
  __makeSchema_UserUncheckedCreateWithoutApplicationsInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutApplicationsInput>;
export const UserUncheckedCreateWithoutApplicationsInputObjectZodSchema =
  __makeSchema_UserUncheckedCreateWithoutApplicationsInput_schema();

// File: UserCreateOrConnectWithoutApplicationsInput.schema.ts
const __makeSchema_UserCreateOrConnectWithoutApplicationsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutApplicationsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutApplicationsInputObjectSchema),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutApplicationsInput> =
  __makeSchema_UserCreateOrConnectWithoutApplicationsInput_schema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutApplicationsInput>;
export const UserCreateOrConnectWithoutApplicationsInputObjectZodSchema =
  __makeSchema_UserCreateOrConnectWithoutApplicationsInput_schema();

// File: ApplicationVersionCreateWithoutApplicationInput.schema.ts
const __makeSchema_ApplicationVersionCreateWithoutApplicationInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      version: z.string(),
      status: ApplicationStatusSchema.optional(),
      releaseNotes: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionCreatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
    })
    .strict();
export const ApplicationVersionCreateWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionCreateWithoutApplicationInput> =
  __makeSchema_ApplicationVersionCreateWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionCreateWithoutApplicationInput>;
export const ApplicationVersionCreateWithoutApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionCreateWithoutApplicationInput_schema();

// File: ApplicationVersionUncheckedCreateWithoutApplicationInput.schema.ts
const __makeSchema_ApplicationVersionUncheckedCreateWithoutApplicationInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      version: z.string(),
      status: ApplicationStatusSchema.optional(),
      releaseNotes: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionCreatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
    })
    .strict();
export const ApplicationVersionUncheckedCreateWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUncheckedCreateWithoutApplicationInput> =
  __makeSchema_ApplicationVersionUncheckedCreateWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUncheckedCreateWithoutApplicationInput>;
export const ApplicationVersionUncheckedCreateWithoutApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionUncheckedCreateWithoutApplicationInput_schema();

// File: ApplicationVersionCreateOrConnectWithoutApplicationInput.schema.ts
const __makeSchema_ApplicationVersionCreateOrConnectWithoutApplicationInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ApplicationVersionCreateWithoutApplicationInputObjectSchema),
        z.lazy(() => ApplicationVersionUncheckedCreateWithoutApplicationInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationVersionCreateOrConnectWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionCreateOrConnectWithoutApplicationInput> =
  __makeSchema_ApplicationVersionCreateOrConnectWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionCreateOrConnectWithoutApplicationInput>;
export const ApplicationVersionCreateOrConnectWithoutApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionCreateOrConnectWithoutApplicationInput_schema();

// File: ApplicationVersionCreateManyApplicationInputEnvelope.schema.ts
const __makeSchema_ApplicationVersionCreateManyApplicationInputEnvelope_schema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => ApplicationVersionCreateManyApplicationInputObjectSchema),
        z.lazy(() => ApplicationVersionCreateManyApplicationInputObjectSchema).array(),
      ]),
    })
    .strict();
export const ApplicationVersionCreateManyApplicationInputEnvelopeObjectSchema: z.ZodType<Prisma.ApplicationVersionCreateManyApplicationInputEnvelope> =
  __makeSchema_ApplicationVersionCreateManyApplicationInputEnvelope_schema() as unknown as z.ZodType<Prisma.ApplicationVersionCreateManyApplicationInputEnvelope>;
export const ApplicationVersionCreateManyApplicationInputEnvelopeObjectZodSchema =
  __makeSchema_ApplicationVersionCreateManyApplicationInputEnvelope_schema();

// File: UserApplicationCreateWithoutApplicationInput.schema.ts
const __makeSchema_UserApplicationCreateWithoutApplicationInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutInstallsInputObjectSchema),
    })
    .strict();
export const UserApplicationCreateWithoutApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationCreateWithoutApplicationInput> =
  __makeSchema_UserApplicationCreateWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateWithoutApplicationInput>;
export const UserApplicationCreateWithoutApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationCreateWithoutApplicationInput_schema();

// File: UserApplicationUncheckedCreateWithoutApplicationInput.schema.ts
const __makeSchema_UserApplicationUncheckedCreateWithoutApplicationInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      userId: z.string(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedCreateWithoutApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedCreateWithoutApplicationInput> =
  __makeSchema_UserApplicationUncheckedCreateWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedCreateWithoutApplicationInput>;
export const UserApplicationUncheckedCreateWithoutApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedCreateWithoutApplicationInput_schema();

// File: UserApplicationCreateOrConnectWithoutApplicationInput.schema.ts
const __makeSchema_UserApplicationCreateOrConnectWithoutApplicationInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserApplicationCreateWithoutApplicationInputObjectSchema),
        z.lazy(() => UserApplicationUncheckedCreateWithoutApplicationInputObjectSchema),
      ]),
    })
    .strict();
export const UserApplicationCreateOrConnectWithoutApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationCreateOrConnectWithoutApplicationInput> =
  __makeSchema_UserApplicationCreateOrConnectWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateOrConnectWithoutApplicationInput>;
export const UserApplicationCreateOrConnectWithoutApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationCreateOrConnectWithoutApplicationInput_schema();

// File: UserApplicationCreateManyApplicationInputEnvelope.schema.ts
const __makeSchema_UserApplicationCreateManyApplicationInputEnvelope_schema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => UserApplicationCreateManyApplicationInputObjectSchema),
        z.lazy(() => UserApplicationCreateManyApplicationInputObjectSchema).array(),
      ]),
    })
    .strict();
export const UserApplicationCreateManyApplicationInputEnvelopeObjectSchema: z.ZodType<Prisma.UserApplicationCreateManyApplicationInputEnvelope> =
  __makeSchema_UserApplicationCreateManyApplicationInputEnvelope_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateManyApplicationInputEnvelope>;
export const UserApplicationCreateManyApplicationInputEnvelopeObjectZodSchema =
  __makeSchema_UserApplicationCreateManyApplicationInputEnvelope_schema();

// File: ApplicationEntryPointsUpsertInput.schema.ts
const __makeSchema_ApplicationEntryPointsUpsertInput_schema = () =>
  z
    .object({
      set: z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
      update: z.lazy(() => ApplicationEntryPointsUpdateInputObjectSchema),
    })
    .strict();
export const ApplicationEntryPointsUpsertInputObjectSchema: z.ZodType<Prisma.ApplicationEntryPointsUpsertInput> =
  __makeSchema_ApplicationEntryPointsUpsertInput_schema() as unknown as z.ZodType<Prisma.ApplicationEntryPointsUpsertInput>;
export const ApplicationEntryPointsUpsertInputObjectZodSchema =
  __makeSchema_ApplicationEntryPointsUpsertInput_schema();

// File: ApplicationStorageMetaUpsertInput.schema.ts
const __makeSchema_ApplicationStorageMetaUpsertInput_schema = () =>
  z
    .object({
      set: z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
      update: z.lazy(() => ApplicationStorageMetaUpdateInputObjectSchema),
    })
    .strict();
export const ApplicationStorageMetaUpsertInputObjectSchema: z.ZodType<Prisma.ApplicationStorageMetaUpsertInput> =
  __makeSchema_ApplicationStorageMetaUpsertInput_schema() as unknown as z.ZodType<Prisma.ApplicationStorageMetaUpsertInput>;
export const ApplicationStorageMetaUpsertInputObjectZodSchema =
  __makeSchema_ApplicationStorageMetaUpsertInput_schema();

// File: UserUpsertWithoutApplicationsInput.schema.ts
const __makeSchema_UserUpsertWithoutApplicationsInput_schema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutApplicationsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutApplicationsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutApplicationsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutApplicationsInputObjectSchema),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutApplicationsInput> =
  __makeSchema_UserUpsertWithoutApplicationsInput_schema() as unknown as z.ZodType<Prisma.UserUpsertWithoutApplicationsInput>;
export const UserUpsertWithoutApplicationsInputObjectZodSchema =
  __makeSchema_UserUpsertWithoutApplicationsInput_schema();

// File: UserUpdateToOneWithWhereWithoutApplicationsInput.schema.ts
const __makeSchema_UserUpdateToOneWithWhereWithoutApplicationsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutApplicationsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutApplicationsInputObjectSchema),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutApplicationsInput> =
  __makeSchema_UserUpdateToOneWithWhereWithoutApplicationsInput_schema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutApplicationsInput>;
export const UserUpdateToOneWithWhereWithoutApplicationsInputObjectZodSchema =
  __makeSchema_UserUpdateToOneWithWhereWithoutApplicationsInput_schema();

// File: UserUpdateWithoutApplicationsInput.schema.ts
const __makeSchema_UserUpdateWithoutApplicationsInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      installs: z
        .lazy(() => UserApplicationUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUpdateManyWithoutUserNestedInputObjectSchema).optional(),
      settings: z.lazy(() => SettingsUpdateOneWithoutUserNestedInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserUpdateWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutApplicationsInput> =
  __makeSchema_UserUpdateWithoutApplicationsInput_schema() as unknown as z.ZodType<Prisma.UserUpdateWithoutApplicationsInput>;
export const UserUpdateWithoutApplicationsInputObjectZodSchema =
  __makeSchema_UserUpdateWithoutApplicationsInput_schema();

// File: UserUncheckedUpdateWithoutApplicationsInput.schema.ts
const __makeSchema_UserUncheckedUpdateWithoutApplicationsInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      installs: z
        .lazy(() => UserApplicationUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
      settings: z
        .lazy(() => SettingsUncheckedUpdateOneWithoutUserNestedInputObjectSchema)
        .optional(),
      dialogs: z.lazy(() => DialogUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserUncheckedUpdateWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutApplicationsInput> =
  __makeSchema_UserUncheckedUpdateWithoutApplicationsInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutApplicationsInput>;
export const UserUncheckedUpdateWithoutApplicationsInputObjectZodSchema =
  __makeSchema_UserUncheckedUpdateWithoutApplicationsInput_schema();

// File: ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInput.schema.ts
const __makeSchema_ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ApplicationVersionUpdateWithoutApplicationInputObjectSchema),
        z.lazy(() => ApplicationVersionUncheckedUpdateWithoutApplicationInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ApplicationVersionCreateWithoutApplicationInputObjectSchema),
        z.lazy(() => ApplicationVersionUncheckedCreateWithoutApplicationInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInput> =
  __makeSchema_ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInput>;
export const ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionUpsertWithWhereUniqueWithoutApplicationInput_schema();

// File: ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInput.schema.ts
const __makeSchema_ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationVersionWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ApplicationVersionUpdateWithoutApplicationInputObjectSchema),
        z.lazy(() => ApplicationVersionUncheckedUpdateWithoutApplicationInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInput> =
  __makeSchema_ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInput>;
export const ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionUpdateWithWhereUniqueWithoutApplicationInput_schema();

// File: ApplicationVersionUpdateManyWithWhereWithoutApplicationInput.schema.ts
const __makeSchema_ApplicationVersionUpdateManyWithWhereWithoutApplicationInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationVersionScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ApplicationVersionUpdateManyMutationInputObjectSchema),
        z.lazy(() => ApplicationVersionUncheckedUpdateManyWithoutApplicationInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationVersionUpdateManyWithWhereWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUpdateManyWithWhereWithoutApplicationInput> =
  __makeSchema_ApplicationVersionUpdateManyWithWhereWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUpdateManyWithWhereWithoutApplicationInput>;
export const ApplicationVersionUpdateManyWithWhereWithoutApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionUpdateManyWithWhereWithoutApplicationInput_schema();

// File: ApplicationVersionScalarWhereInput.schema.ts

const applicationversionscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => ApplicationVersionScalarWhereInputObjectSchema),
        z.lazy(() => ApplicationVersionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ApplicationVersionScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ApplicationVersionScalarWhereInputObjectSchema),
        z.lazy(() => ApplicationVersionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    applicationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    version: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    status: z
      .union([z.lazy(() => EnumApplicationStatusFilterObjectSchema), ApplicationStatusSchema])
      .optional(),
    releaseNotes: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeFilterObjectSchema),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
          .transform((v) => new Date(v)),
      ])
      .optional(),
    permissions: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    manifest: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  })
  .strict();
export const ApplicationVersionScalarWhereInputObjectSchema: z.ZodType<Prisma.ApplicationVersionScalarWhereInput> =
  applicationversionscalarwhereinputSchema as unknown as z.ZodType<Prisma.ApplicationVersionScalarWhereInput>;
export const ApplicationVersionScalarWhereInputObjectZodSchema =
  applicationversionscalarwhereinputSchema;

// File: UserApplicationUpsertWithWhereUniqueWithoutApplicationInput.schema.ts
const __makeSchema_UserApplicationUpsertWithWhereUniqueWithoutApplicationInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => UserApplicationUpdateWithoutApplicationInputObjectSchema),
        z.lazy(() => UserApplicationUncheckedUpdateWithoutApplicationInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserApplicationCreateWithoutApplicationInputObjectSchema),
        z.lazy(() => UserApplicationUncheckedCreateWithoutApplicationInputObjectSchema),
      ]),
    })
    .strict();
export const UserApplicationUpsertWithWhereUniqueWithoutApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationUpsertWithWhereUniqueWithoutApplicationInput> =
  __makeSchema_UserApplicationUpsertWithWhereUniqueWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpsertWithWhereUniqueWithoutApplicationInput>;
export const UserApplicationUpsertWithWhereUniqueWithoutApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationUpsertWithWhereUniqueWithoutApplicationInput_schema();

// File: UserApplicationUpdateWithWhereUniqueWithoutApplicationInput.schema.ts
const __makeSchema_UserApplicationUpdateWithWhereUniqueWithoutApplicationInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserApplicationWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => UserApplicationUpdateWithoutApplicationInputObjectSchema),
        z.lazy(() => UserApplicationUncheckedUpdateWithoutApplicationInputObjectSchema),
      ]),
    })
    .strict();
export const UserApplicationUpdateWithWhereUniqueWithoutApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationUpdateWithWhereUniqueWithoutApplicationInput> =
  __makeSchema_UserApplicationUpdateWithWhereUniqueWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpdateWithWhereUniqueWithoutApplicationInput>;
export const UserApplicationUpdateWithWhereUniqueWithoutApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationUpdateWithWhereUniqueWithoutApplicationInput_schema();

// File: UserApplicationUpdateManyWithWhereWithoutApplicationInput.schema.ts
const __makeSchema_UserApplicationUpdateManyWithWhereWithoutApplicationInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserApplicationScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => UserApplicationUpdateManyMutationInputObjectSchema),
        z.lazy(() => UserApplicationUncheckedUpdateManyWithoutApplicationInputObjectSchema),
      ]),
    })
    .strict();
export const UserApplicationUpdateManyWithWhereWithoutApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationUpdateManyWithWhereWithoutApplicationInput> =
  __makeSchema_UserApplicationUpdateManyWithWhereWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpdateManyWithWhereWithoutApplicationInput>;
export const UserApplicationUpdateManyWithWhereWithoutApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationUpdateManyWithWhereWithoutApplicationInput_schema();

// File: ApplicationCreateWithoutVersionsInput.schema.ts
const __makeSchema_ApplicationCreateWithoutVersionsInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      key: z.string(),
      name: z.string(),
      version: z.string(),
      type: ApplicationTypeSchema,
      description: z.string().optional().nullable(),
      status: ApplicationStatusSchema.optional(),
      isPublished: z.boolean().optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationCreatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
      icon: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      owner: z.lazy(() => UserCreateNestedOneWithoutApplicationsInputObjectSchema).optional(),
      userInstalls: z
        .lazy(() => UserApplicationCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationCreateWithoutVersionsInputObjectSchema: z.ZodType<Prisma.ApplicationCreateWithoutVersionsInput> =
  __makeSchema_ApplicationCreateWithoutVersionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateWithoutVersionsInput>;
export const ApplicationCreateWithoutVersionsInputObjectZodSchema =
  __makeSchema_ApplicationCreateWithoutVersionsInput_schema();

// File: ApplicationUncheckedCreateWithoutVersionsInput.schema.ts
const __makeSchema_ApplicationUncheckedCreateWithoutVersionsInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      key: z.string(),
      name: z.string(),
      version: z.string(),
      type: ApplicationTypeSchema,
      description: z.string().optional().nullable(),
      status: ApplicationStatusSchema.optional(),
      isPublished: z.boolean().optional(),
      ownerId: z.string().optional().nullable(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationCreatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
      icon: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      userInstalls: z
        .lazy(() => UserApplicationUncheckedCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUncheckedCreateWithoutVersionsInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedCreateWithoutVersionsInput> =
  __makeSchema_ApplicationUncheckedCreateWithoutVersionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedCreateWithoutVersionsInput>;
export const ApplicationUncheckedCreateWithoutVersionsInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedCreateWithoutVersionsInput_schema();

// File: ApplicationCreateOrConnectWithoutVersionsInput.schema.ts
const __makeSchema_ApplicationCreateOrConnectWithoutVersionsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ApplicationCreateWithoutVersionsInputObjectSchema),
        z.lazy(() => ApplicationUncheckedCreateWithoutVersionsInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationCreateOrConnectWithoutVersionsInputObjectSchema: z.ZodType<Prisma.ApplicationCreateOrConnectWithoutVersionsInput> =
  __makeSchema_ApplicationCreateOrConnectWithoutVersionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateOrConnectWithoutVersionsInput>;
export const ApplicationCreateOrConnectWithoutVersionsInputObjectZodSchema =
  __makeSchema_ApplicationCreateOrConnectWithoutVersionsInput_schema();

// File: ApplicationUpsertWithoutVersionsInput.schema.ts
const __makeSchema_ApplicationUpsertWithoutVersionsInput_schema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => ApplicationUpdateWithoutVersionsInputObjectSchema),
        z.lazy(() => ApplicationUncheckedUpdateWithoutVersionsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ApplicationCreateWithoutVersionsInputObjectSchema),
        z.lazy(() => ApplicationUncheckedCreateWithoutVersionsInputObjectSchema),
      ]),
      where: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationUpsertWithoutVersionsInputObjectSchema: z.ZodType<Prisma.ApplicationUpsertWithoutVersionsInput> =
  __makeSchema_ApplicationUpsertWithoutVersionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpsertWithoutVersionsInput>;
export const ApplicationUpsertWithoutVersionsInputObjectZodSchema =
  __makeSchema_ApplicationUpsertWithoutVersionsInput_schema();

// File: ApplicationUpdateToOneWithWhereWithoutVersionsInput.schema.ts
const __makeSchema_ApplicationUpdateToOneWithWhereWithoutVersionsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => ApplicationUpdateWithoutVersionsInputObjectSchema),
        z.lazy(() => ApplicationUncheckedUpdateWithoutVersionsInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationUpdateToOneWithWhereWithoutVersionsInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateToOneWithWhereWithoutVersionsInput> =
  __makeSchema_ApplicationUpdateToOneWithWhereWithoutVersionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateToOneWithWhereWithoutVersionsInput>;
export const ApplicationUpdateToOneWithWhereWithoutVersionsInputObjectZodSchema =
  __makeSchema_ApplicationUpdateToOneWithWhereWithoutVersionsInput_schema();

// File: ApplicationUpdateWithoutVersionsInput.schema.ts
const __makeSchema_ApplicationUpdateWithoutVersionsInput_schema = () =>
  z
    .object({
      key: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      type: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => EnumApplicationTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPublished: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationUpdatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      icon: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      owner: z.lazy(() => UserUpdateOneWithoutApplicationsNestedInputObjectSchema).optional(),
      userInstalls: z
        .lazy(() => UserApplicationUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUpdateWithoutVersionsInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateWithoutVersionsInput> =
  __makeSchema_ApplicationUpdateWithoutVersionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateWithoutVersionsInput>;
export const ApplicationUpdateWithoutVersionsInputObjectZodSchema =
  __makeSchema_ApplicationUpdateWithoutVersionsInput_schema();

// File: ApplicationUncheckedUpdateWithoutVersionsInput.schema.ts
const __makeSchema_ApplicationUncheckedUpdateWithoutVersionsInput_schema = () =>
  z
    .object({
      key: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      type: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => EnumApplicationTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPublished: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      ownerId: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationUpdatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      icon: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      userInstalls: z
        .lazy(() => UserApplicationUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUncheckedUpdateWithoutVersionsInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedUpdateWithoutVersionsInput> =
  __makeSchema_ApplicationUncheckedUpdateWithoutVersionsInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedUpdateWithoutVersionsInput>;
export const ApplicationUncheckedUpdateWithoutVersionsInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedUpdateWithoutVersionsInput_schema();

// File: UserCreateWithoutInstallsInput.schema.ts
const __makeSchema_UserCreateWithoutInstallsInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      applications: z
        .lazy(() => ApplicationCreateNestedManyWithoutOwnerInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyCreateNestedManyWithoutUserInputObjectSchema).optional(),
      settings: z.lazy(() => SettingsCreateNestedOneWithoutUserInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogCreateNestedManyWithoutUserInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateWithoutInstallsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutInstallsInput> =
  __makeSchema_UserCreateWithoutInstallsInput_schema() as unknown as z.ZodType<Prisma.UserCreateWithoutInstallsInput>;
export const UserCreateWithoutInstallsInputObjectZodSchema =
  __makeSchema_UserCreateWithoutInstallsInput_schema();

// File: UserUncheckedCreateWithoutInstallsInput.schema.ts
const __makeSchema_UserUncheckedCreateWithoutInstallsInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      applications: z
        .lazy(() => ApplicationUncheckedCreateNestedManyWithoutOwnerInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
      settings: z
        .lazy(() => SettingsUncheckedCreateNestedOneWithoutUserInputObjectSchema)
        .optional(),
      dialogs: z.lazy(() => DialogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
    })
    .strict();
export const UserUncheckedCreateWithoutInstallsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInstallsInput> =
  __makeSchema_UserUncheckedCreateWithoutInstallsInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutInstallsInput>;
export const UserUncheckedCreateWithoutInstallsInputObjectZodSchema =
  __makeSchema_UserUncheckedCreateWithoutInstallsInput_schema();

// File: UserCreateOrConnectWithoutInstallsInput.schema.ts
const __makeSchema_UserCreateOrConnectWithoutInstallsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutInstallsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutInstallsInputObjectSchema),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutInstallsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInstallsInput> =
  __makeSchema_UserCreateOrConnectWithoutInstallsInput_schema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutInstallsInput>;
export const UserCreateOrConnectWithoutInstallsInputObjectZodSchema =
  __makeSchema_UserCreateOrConnectWithoutInstallsInput_schema();

// File: ApplicationCreateWithoutUserInstallsInput.schema.ts
const __makeSchema_ApplicationCreateWithoutUserInstallsInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      key: z.string(),
      name: z.string(),
      version: z.string(),
      type: ApplicationTypeSchema,
      description: z.string().optional().nullable(),
      status: ApplicationStatusSchema.optional(),
      isPublished: z.boolean().optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationCreatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
      icon: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      owner: z.lazy(() => UserCreateNestedOneWithoutApplicationsInputObjectSchema).optional(),
      versions: z
        .lazy(() => ApplicationVersionCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationCreateWithoutUserInstallsInputObjectSchema: z.ZodType<Prisma.ApplicationCreateWithoutUserInstallsInput> =
  __makeSchema_ApplicationCreateWithoutUserInstallsInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateWithoutUserInstallsInput>;
export const ApplicationCreateWithoutUserInstallsInputObjectZodSchema =
  __makeSchema_ApplicationCreateWithoutUserInstallsInput_schema();

// File: ApplicationUncheckedCreateWithoutUserInstallsInput.schema.ts
const __makeSchema_ApplicationUncheckedCreateWithoutUserInstallsInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      key: z.string(),
      name: z.string(),
      version: z.string(),
      type: ApplicationTypeSchema,
      description: z.string().optional().nullable(),
      status: ApplicationStatusSchema.optional(),
      isPublished: z.boolean().optional(),
      ownerId: z.string().optional().nullable(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationCreatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
      icon: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      versions: z
        .lazy(() => ApplicationVersionUncheckedCreateNestedManyWithoutApplicationInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUncheckedCreateWithoutUserInstallsInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedCreateWithoutUserInstallsInput> =
  __makeSchema_ApplicationUncheckedCreateWithoutUserInstallsInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedCreateWithoutUserInstallsInput>;
export const ApplicationUncheckedCreateWithoutUserInstallsInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedCreateWithoutUserInstallsInput_schema();

// File: ApplicationCreateOrConnectWithoutUserInstallsInput.schema.ts
const __makeSchema_ApplicationCreateOrConnectWithoutUserInstallsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ApplicationCreateWithoutUserInstallsInputObjectSchema),
        z.lazy(() => ApplicationUncheckedCreateWithoutUserInstallsInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationCreateOrConnectWithoutUserInstallsInputObjectSchema: z.ZodType<Prisma.ApplicationCreateOrConnectWithoutUserInstallsInput> =
  __makeSchema_ApplicationCreateOrConnectWithoutUserInstallsInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateOrConnectWithoutUserInstallsInput>;
export const ApplicationCreateOrConnectWithoutUserInstallsInputObjectZodSchema =
  __makeSchema_ApplicationCreateOrConnectWithoutUserInstallsInput_schema();

// File: UserUpsertWithoutInstallsInput.schema.ts
const __makeSchema_UserUpsertWithoutInstallsInput_schema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutInstallsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutInstallsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutInstallsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutInstallsInputObjectSchema),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutInstallsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutInstallsInput> =
  __makeSchema_UserUpsertWithoutInstallsInput_schema() as unknown as z.ZodType<Prisma.UserUpsertWithoutInstallsInput>;
export const UserUpsertWithoutInstallsInputObjectZodSchema =
  __makeSchema_UserUpsertWithoutInstallsInput_schema();

// File: UserUpdateToOneWithWhereWithoutInstallsInput.schema.ts
const __makeSchema_UserUpdateToOneWithWhereWithoutInstallsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutInstallsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutInstallsInputObjectSchema),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutInstallsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInstallsInput> =
  __makeSchema_UserUpdateToOneWithWhereWithoutInstallsInput_schema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInstallsInput>;
export const UserUpdateToOneWithWhereWithoutInstallsInputObjectZodSchema =
  __makeSchema_UserUpdateToOneWithWhereWithoutInstallsInput_schema();

// File: UserUpdateWithoutInstallsInput.schema.ts
const __makeSchema_UserUpdateWithoutInstallsInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      applications: z
        .lazy(() => ApplicationUpdateManyWithoutOwnerNestedInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUpdateManyWithoutUserNestedInputObjectSchema).optional(),
      settings: z.lazy(() => SettingsUpdateOneWithoutUserNestedInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserUpdateWithoutInstallsInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutInstallsInput> =
  __makeSchema_UserUpdateWithoutInstallsInput_schema() as unknown as z.ZodType<Prisma.UserUpdateWithoutInstallsInput>;
export const UserUpdateWithoutInstallsInputObjectZodSchema =
  __makeSchema_UserUpdateWithoutInstallsInput_schema();

// File: UserUncheckedUpdateWithoutInstallsInput.schema.ts
const __makeSchema_UserUncheckedUpdateWithoutInstallsInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      applications: z
        .lazy(() => ApplicationUncheckedUpdateManyWithoutOwnerNestedInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
      settings: z
        .lazy(() => SettingsUncheckedUpdateOneWithoutUserNestedInputObjectSchema)
        .optional(),
      dialogs: z.lazy(() => DialogUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserUncheckedUpdateWithoutInstallsInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInstallsInput> =
  __makeSchema_UserUncheckedUpdateWithoutInstallsInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutInstallsInput>;
export const UserUncheckedUpdateWithoutInstallsInputObjectZodSchema =
  __makeSchema_UserUncheckedUpdateWithoutInstallsInput_schema();

// File: ApplicationUpsertWithoutUserInstallsInput.schema.ts
const __makeSchema_ApplicationUpsertWithoutUserInstallsInput_schema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => ApplicationUpdateWithoutUserInstallsInputObjectSchema),
        z.lazy(() => ApplicationUncheckedUpdateWithoutUserInstallsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ApplicationCreateWithoutUserInstallsInputObjectSchema),
        z.lazy(() => ApplicationUncheckedCreateWithoutUserInstallsInputObjectSchema),
      ]),
      where: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationUpsertWithoutUserInstallsInputObjectSchema: z.ZodType<Prisma.ApplicationUpsertWithoutUserInstallsInput> =
  __makeSchema_ApplicationUpsertWithoutUserInstallsInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpsertWithoutUserInstallsInput>;
export const ApplicationUpsertWithoutUserInstallsInputObjectZodSchema =
  __makeSchema_ApplicationUpsertWithoutUserInstallsInput_schema();

// File: ApplicationUpdateToOneWithWhereWithoutUserInstallsInput.schema.ts
const __makeSchema_ApplicationUpdateToOneWithWhereWithoutUserInstallsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => ApplicationUpdateWithoutUserInstallsInputObjectSchema),
        z.lazy(() => ApplicationUncheckedUpdateWithoutUserInstallsInputObjectSchema),
      ]),
    })
    .strict();
export const ApplicationUpdateToOneWithWhereWithoutUserInstallsInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateToOneWithWhereWithoutUserInstallsInput> =
  __makeSchema_ApplicationUpdateToOneWithWhereWithoutUserInstallsInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateToOneWithWhereWithoutUserInstallsInput>;
export const ApplicationUpdateToOneWithWhereWithoutUserInstallsInputObjectZodSchema =
  __makeSchema_ApplicationUpdateToOneWithWhereWithoutUserInstallsInput_schema();

// File: ApplicationUpdateWithoutUserInstallsInput.schema.ts
const __makeSchema_ApplicationUpdateWithoutUserInstallsInput_schema = () =>
  z
    .object({
      key: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      type: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => EnumApplicationTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPublished: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationUpdatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      icon: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      owner: z.lazy(() => UserUpdateOneWithoutApplicationsNestedInputObjectSchema).optional(),
      versions: z
        .lazy(() => ApplicationVersionUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUpdateWithoutUserInstallsInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateWithoutUserInstallsInput> =
  __makeSchema_ApplicationUpdateWithoutUserInstallsInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateWithoutUserInstallsInput>;
export const ApplicationUpdateWithoutUserInstallsInputObjectZodSchema =
  __makeSchema_ApplicationUpdateWithoutUserInstallsInput_schema();

// File: ApplicationUncheckedUpdateWithoutUserInstallsInput.schema.ts
const __makeSchema_ApplicationUncheckedUpdateWithoutUserInstallsInput_schema = () =>
  z
    .object({
      key: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      type: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => EnumApplicationTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPublished: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      ownerId: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationUpdatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      icon: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      versions: z
        .lazy(() => ApplicationVersionUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUncheckedUpdateWithoutUserInstallsInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedUpdateWithoutUserInstallsInput> =
  __makeSchema_ApplicationUncheckedUpdateWithoutUserInstallsInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedUpdateWithoutUserInstallsInput>;
export const ApplicationUncheckedUpdateWithoutUserInstallsInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedUpdateWithoutUserInstallsInput_schema();

// File: UserCreateWithoutApiKeysInput.schema.ts
const __makeSchema_UserCreateWithoutApiKeysInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      applications: z
        .lazy(() => ApplicationCreateNestedManyWithoutOwnerInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      settings: z.lazy(() => SettingsCreateNestedOneWithoutUserInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogCreateNestedManyWithoutUserInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateWithoutApiKeysInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutApiKeysInput> =
  __makeSchema_UserCreateWithoutApiKeysInput_schema() as unknown as z.ZodType<Prisma.UserCreateWithoutApiKeysInput>;
export const UserCreateWithoutApiKeysInputObjectZodSchema =
  __makeSchema_UserCreateWithoutApiKeysInput_schema();

// File: UserUncheckedCreateWithoutApiKeysInput.schema.ts
const __makeSchema_UserUncheckedCreateWithoutApiKeysInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      applications: z
        .lazy(() => ApplicationUncheckedCreateNestedManyWithoutOwnerInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUncheckedCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      settings: z
        .lazy(() => SettingsUncheckedCreateNestedOneWithoutUserInputObjectSchema)
        .optional(),
      dialogs: z.lazy(() => DialogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
    })
    .strict();
export const UserUncheckedCreateWithoutApiKeysInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutApiKeysInput> =
  __makeSchema_UserUncheckedCreateWithoutApiKeysInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutApiKeysInput>;
export const UserUncheckedCreateWithoutApiKeysInputObjectZodSchema =
  __makeSchema_UserUncheckedCreateWithoutApiKeysInput_schema();

// File: UserCreateOrConnectWithoutApiKeysInput.schema.ts
const __makeSchema_UserCreateOrConnectWithoutApiKeysInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutApiKeysInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutApiKeysInputObjectSchema),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutApiKeysInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutApiKeysInput> =
  __makeSchema_UserCreateOrConnectWithoutApiKeysInput_schema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutApiKeysInput>;
export const UserCreateOrConnectWithoutApiKeysInputObjectZodSchema =
  __makeSchema_UserCreateOrConnectWithoutApiKeysInput_schema();

// File: UserUpsertWithoutApiKeysInput.schema.ts
const __makeSchema_UserUpsertWithoutApiKeysInput_schema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutApiKeysInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutApiKeysInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutApiKeysInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutApiKeysInputObjectSchema),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutApiKeysInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutApiKeysInput> =
  __makeSchema_UserUpsertWithoutApiKeysInput_schema() as unknown as z.ZodType<Prisma.UserUpsertWithoutApiKeysInput>;
export const UserUpsertWithoutApiKeysInputObjectZodSchema =
  __makeSchema_UserUpsertWithoutApiKeysInput_schema();

// File: UserUpdateToOneWithWhereWithoutApiKeysInput.schema.ts
const __makeSchema_UserUpdateToOneWithWhereWithoutApiKeysInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutApiKeysInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutApiKeysInputObjectSchema),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutApiKeysInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutApiKeysInput> =
  __makeSchema_UserUpdateToOneWithWhereWithoutApiKeysInput_schema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutApiKeysInput>;
export const UserUpdateToOneWithWhereWithoutApiKeysInputObjectZodSchema =
  __makeSchema_UserUpdateToOneWithWhereWithoutApiKeysInput_schema();

// File: UserUpdateWithoutApiKeysInput.schema.ts
const __makeSchema_UserUpdateWithoutApiKeysInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      applications: z
        .lazy(() => ApplicationUpdateManyWithoutOwnerNestedInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      settings: z.lazy(() => SettingsUpdateOneWithoutUserNestedInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserUpdateWithoutApiKeysInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutApiKeysInput> =
  __makeSchema_UserUpdateWithoutApiKeysInput_schema() as unknown as z.ZodType<Prisma.UserUpdateWithoutApiKeysInput>;
export const UserUpdateWithoutApiKeysInputObjectZodSchema =
  __makeSchema_UserUpdateWithoutApiKeysInput_schema();

// File: UserUncheckedUpdateWithoutApiKeysInput.schema.ts
const __makeSchema_UserUncheckedUpdateWithoutApiKeysInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      applications: z
        .lazy(() => ApplicationUncheckedUpdateManyWithoutOwnerNestedInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      settings: z
        .lazy(() => SettingsUncheckedUpdateOneWithoutUserNestedInputObjectSchema)
        .optional(),
      dialogs: z.lazy(() => DialogUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserUncheckedUpdateWithoutApiKeysInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutApiKeysInput> =
  __makeSchema_UserUncheckedUpdateWithoutApiKeysInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutApiKeysInput>;
export const UserUncheckedUpdateWithoutApiKeysInputObjectZodSchema =
  __makeSchema_UserUncheckedUpdateWithoutApiKeysInput_schema();

// File: UserCreateWithoutSettingsInput.schema.ts
const __makeSchema_UserCreateWithoutSettingsInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      applications: z
        .lazy(() => ApplicationCreateNestedManyWithoutOwnerInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyCreateNestedManyWithoutUserInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogCreateNestedManyWithoutUserInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateWithoutSettingsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutSettingsInput> =
  __makeSchema_UserCreateWithoutSettingsInput_schema() as unknown as z.ZodType<Prisma.UserCreateWithoutSettingsInput>;
export const UserCreateWithoutSettingsInputObjectZodSchema =
  __makeSchema_UserCreateWithoutSettingsInput_schema();

// File: UserUncheckedCreateWithoutSettingsInput.schema.ts
const __makeSchema_UserUncheckedCreateWithoutSettingsInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      applications: z
        .lazy(() => ApplicationUncheckedCreateNestedManyWithoutOwnerInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUncheckedCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
    })
    .strict();
export const UserUncheckedCreateWithoutSettingsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSettingsInput> =
  __makeSchema_UserUncheckedCreateWithoutSettingsInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutSettingsInput>;
export const UserUncheckedCreateWithoutSettingsInputObjectZodSchema =
  __makeSchema_UserUncheckedCreateWithoutSettingsInput_schema();

// File: UserCreateOrConnectWithoutSettingsInput.schema.ts
const __makeSchema_UserCreateOrConnectWithoutSettingsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutSettingsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutSettingsInputObjectSchema),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutSettingsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSettingsInput> =
  __makeSchema_UserCreateOrConnectWithoutSettingsInput_schema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutSettingsInput>;
export const UserCreateOrConnectWithoutSettingsInputObjectZodSchema =
  __makeSchema_UserCreateOrConnectWithoutSettingsInput_schema();

// File: ModelSceneSettingsUpsertInput.schema.ts
const __makeSchema_ModelSceneSettingsUpsertInput_schema = () =>
  z
    .object({
      set: z.lazy(() => ModelSceneSettingsCreateInputObjectSchema),
      update: z.lazy(() => ModelSceneSettingsUpdateInputObjectSchema),
    })
    .strict();
export const ModelSceneSettingsUpsertInputObjectSchema: z.ZodType<Prisma.ModelSceneSettingsUpsertInput> =
  __makeSchema_ModelSceneSettingsUpsertInput_schema() as unknown as z.ZodType<Prisma.ModelSceneSettingsUpsertInput>;
export const ModelSceneSettingsUpsertInputObjectZodSchema =
  __makeSchema_ModelSceneSettingsUpsertInput_schema();

// File: UserUpsertWithoutSettingsInput.schema.ts
const __makeSchema_UserUpsertWithoutSettingsInput_schema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutSettingsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSettingsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutSettingsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutSettingsInputObjectSchema),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutSettingsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutSettingsInput> =
  __makeSchema_UserUpsertWithoutSettingsInput_schema() as unknown as z.ZodType<Prisma.UserUpsertWithoutSettingsInput>;
export const UserUpsertWithoutSettingsInputObjectZodSchema =
  __makeSchema_UserUpsertWithoutSettingsInput_schema();

// File: UserUpdateToOneWithWhereWithoutSettingsInput.schema.ts
const __makeSchema_UserUpdateToOneWithWhereWithoutSettingsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutSettingsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSettingsInputObjectSchema),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutSettingsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSettingsInput> =
  __makeSchema_UserUpdateToOneWithWhereWithoutSettingsInput_schema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSettingsInput>;
export const UserUpdateToOneWithWhereWithoutSettingsInputObjectZodSchema =
  __makeSchema_UserUpdateToOneWithWhereWithoutSettingsInput_schema();

// File: UserUpdateWithoutSettingsInput.schema.ts
const __makeSchema_UserUpdateWithoutSettingsInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      applications: z
        .lazy(() => ApplicationUpdateManyWithoutOwnerNestedInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUpdateManyWithoutUserNestedInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserUpdateWithoutSettingsInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutSettingsInput> =
  __makeSchema_UserUpdateWithoutSettingsInput_schema() as unknown as z.ZodType<Prisma.UserUpdateWithoutSettingsInput>;
export const UserUpdateWithoutSettingsInputObjectZodSchema =
  __makeSchema_UserUpdateWithoutSettingsInput_schema();

// File: UserUncheckedUpdateWithoutSettingsInput.schema.ts
const __makeSchema_UserUncheckedUpdateWithoutSettingsInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      applications: z
        .lazy(() => ApplicationUncheckedUpdateManyWithoutOwnerNestedInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
      dialogs: z.lazy(() => DialogUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserUncheckedUpdateWithoutSettingsInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSettingsInput> =
  __makeSchema_UserUncheckedUpdateWithoutSettingsInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutSettingsInput>;
export const UserUncheckedUpdateWithoutSettingsInputObjectZodSchema =
  __makeSchema_UserUncheckedUpdateWithoutSettingsInput_schema();

// File: UserCreateWithoutDialogsInput.schema.ts
const __makeSchema_UserCreateWithoutDialogsInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      applications: z
        .lazy(() => ApplicationCreateNestedManyWithoutOwnerInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyCreateNestedManyWithoutUserInputObjectSchema).optional(),
      settings: z.lazy(() => SettingsCreateNestedOneWithoutUserInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateWithoutDialogsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutDialogsInput> =
  __makeSchema_UserCreateWithoutDialogsInput_schema() as unknown as z.ZodType<Prisma.UserCreateWithoutDialogsInput>;
export const UserCreateWithoutDialogsInputObjectZodSchema =
  __makeSchema_UserCreateWithoutDialogsInput_schema();

// File: UserUncheckedCreateWithoutDialogsInput.schema.ts
const __makeSchema_UserUncheckedCreateWithoutDialogsInput_schema = () =>
  z
    .object({
      id: z.string().optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListCreateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z.string().optional().nullable(),
      resetPasswordExpires: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional()
        .nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      applications: z
        .lazy(() => ApplicationUncheckedCreateNestedManyWithoutOwnerInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUncheckedCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
      settings: z
        .lazy(() => SettingsUncheckedCreateNestedOneWithoutUserInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserUncheckedCreateWithoutDialogsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDialogsInput> =
  __makeSchema_UserUncheckedCreateWithoutDialogsInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutDialogsInput>;
export const UserUncheckedCreateWithoutDialogsInputObjectZodSchema =
  __makeSchema_UserUncheckedCreateWithoutDialogsInput_schema();

// File: UserCreateOrConnectWithoutDialogsInput.schema.ts
const __makeSchema_UserCreateOrConnectWithoutDialogsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutDialogsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutDialogsInputObjectSchema),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutDialogsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDialogsInput> =
  __makeSchema_UserCreateOrConnectWithoutDialogsInput_schema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutDialogsInput>;
export const UserCreateOrConnectWithoutDialogsInputObjectZodSchema =
  __makeSchema_UserCreateOrConnectWithoutDialogsInput_schema();

// File: ChatMessageUpdateManyInput.schema.ts
const __makeSchema_ChatMessageUpdateManyInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ChatMessageWhereInputObjectSchema),
      data: z.lazy(() => ChatMessageUpdateInputObjectSchema),
    })
    .strict();
export const ChatMessageUpdateManyInputObjectSchema: z.ZodType<Prisma.ChatMessageUpdateManyInput> =
  __makeSchema_ChatMessageUpdateManyInput_schema() as unknown as z.ZodType<Prisma.ChatMessageUpdateManyInput>;
export const ChatMessageUpdateManyInputObjectZodSchema =
  __makeSchema_ChatMessageUpdateManyInput_schema();

// File: ChatMessageDeleteManyInput.schema.ts
const __makeSchema_ChatMessageDeleteManyInput_schema = () =>
  z
    .object({
      where: z.lazy(() => ChatMessageWhereInputObjectSchema),
    })
    .strict();
export const ChatMessageDeleteManyInputObjectSchema: z.ZodType<Prisma.ChatMessageDeleteManyInput> =
  __makeSchema_ChatMessageDeleteManyInput_schema() as unknown as z.ZodType<Prisma.ChatMessageDeleteManyInput>;
export const ChatMessageDeleteManyInputObjectZodSchema =
  __makeSchema_ChatMessageDeleteManyInput_schema();

// File: UserUpsertWithoutDialogsInput.schema.ts
const __makeSchema_UserUpsertWithoutDialogsInput_schema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutDialogsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutDialogsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutDialogsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutDialogsInputObjectSchema),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutDialogsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutDialogsInput> =
  __makeSchema_UserUpsertWithoutDialogsInput_schema() as unknown as z.ZodType<Prisma.UserUpsertWithoutDialogsInput>;
export const UserUpsertWithoutDialogsInputObjectZodSchema =
  __makeSchema_UserUpsertWithoutDialogsInput_schema();

// File: UserUpdateToOneWithWhereWithoutDialogsInput.schema.ts
const __makeSchema_UserUpdateToOneWithWhereWithoutDialogsInput_schema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutDialogsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutDialogsInputObjectSchema),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutDialogsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDialogsInput> =
  __makeSchema_UserUpdateToOneWithWhereWithoutDialogsInput_schema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDialogsInput>;
export const UserUpdateToOneWithWhereWithoutDialogsInputObjectZodSchema =
  __makeSchema_UserUpdateToOneWithWhereWithoutDialogsInput_schema();

// File: UserUpdateWithoutDialogsInput.schema.ts
const __makeSchema_UserUpdateWithoutDialogsInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      applications: z
        .lazy(() => ApplicationUpdateManyWithoutOwnerNestedInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUpdateManyWithoutUserNestedInputObjectSchema).optional(),
      settings: z.lazy(() => SettingsUpdateOneWithoutUserNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserUpdateWithoutDialogsInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutDialogsInput> =
  __makeSchema_UserUpdateWithoutDialogsInput_schema() as unknown as z.ZodType<Prisma.UserUpdateWithoutDialogsInput>;
export const UserUpdateWithoutDialogsInputObjectZodSchema =
  __makeSchema_UserUpdateWithoutDialogsInput_schema();

// File: UserUncheckedUpdateWithoutDialogsInput.schema.ts
const __makeSchema_UserUncheckedUpdateWithoutDialogsInput_schema = () =>
  z
    .object({
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      oauthProviders: z
        .union([
          z.lazy(() => OAuthProviderListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema),
          z.lazy(() => OAuthProviderCreateInputObjectSchema).array(),
        ])
        .optional(),
      resetPasswordToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      resetPasswordExpires: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      applications: z
        .lazy(() => ApplicationUncheckedUpdateManyWithoutOwnerNestedInputObjectSchema)
        .optional(),
      installs: z
        .lazy(() => UserApplicationUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      apiKeys: z.lazy(() => ApiKeyUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
      settings: z
        .lazy(() => SettingsUncheckedUpdateOneWithoutUserNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserUncheckedUpdateWithoutDialogsInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDialogsInput> =
  __makeSchema_UserUncheckedUpdateWithoutDialogsInput_schema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutDialogsInput>;
export const UserUncheckedUpdateWithoutDialogsInputObjectZodSchema =
  __makeSchema_UserUncheckedUpdateWithoutDialogsInput_schema();

// File: BoolNullableFilter.schema.ts
const __makeSchema_BoolNullableFilter_schema = () =>
  z
    .object({
      equals: z.boolean().optional().nullable(),
      not: z
        .union([z.boolean(), z.lazy(() => NestedBoolNullableFilterObjectSchema)])
        .optional()
        .nullable(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const BoolNullableFilterObjectSchema: z.ZodType<Prisma.BoolNullableFilter> =
  __makeSchema_BoolNullableFilter_schema() as unknown as z.ZodType<Prisma.BoolNullableFilter>;
export const BoolNullableFilterObjectZodSchema = __makeSchema_BoolNullableFilter_schema();

// File: FloatNullableFilter.schema.ts
const __makeSchema_FloatNullableFilter_schema = () =>
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterObjectSchema)])
        .optional()
        .nullable(),
      isSet: z.boolean().optional(),
    })
    .strict();
export const FloatNullableFilterObjectSchema: z.ZodType<Prisma.FloatNullableFilter> =
  __makeSchema_FloatNullableFilter_schema() as unknown as z.ZodType<Prisma.FloatNullableFilter>;
export const FloatNullableFilterObjectZodSchema = __makeSchema_FloatNullableFilter_schema();

// File: EnumMessagePositionFilter.schema.ts
const __makeSchema_EnumMessagePositionFilter_schema = () =>
  z
    .object({
      equals: MessagePositionSchema.optional(),
      in: MessagePositionSchema.array().optional(),
      notIn: MessagePositionSchema.array().optional(),
      not: z
        .union([MessagePositionSchema, z.lazy(() => NestedEnumMessagePositionFilterObjectSchema)])
        .optional(),
    })
    .strict();
export const EnumMessagePositionFilterObjectSchema: z.ZodType<Prisma.EnumMessagePositionFilter> =
  __makeSchema_EnumMessagePositionFilter_schema() as unknown as z.ZodType<Prisma.EnumMessagePositionFilter>;
export const EnumMessagePositionFilterObjectZodSchema =
  __makeSchema_EnumMessagePositionFilter_schema();

// File: ApplicationCreateManyOwnerInput.schema.ts
const __makeSchema_ApplicationCreateManyOwnerInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      key: z.string(),
      name: z.string(),
      version: z.string(),
      type: ApplicationTypeSchema,
      description: z.string().optional().nullable(),
      status: ApplicationStatusSchema.optional(),
      isPublished: z.boolean().optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationCreatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
      icon: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const ApplicationCreateManyOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationCreateManyOwnerInput> =
  __makeSchema_ApplicationCreateManyOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationCreateManyOwnerInput>;
export const ApplicationCreateManyOwnerInputObjectZodSchema =
  __makeSchema_ApplicationCreateManyOwnerInput_schema();

// File: UserApplicationCreateManyUserInput.schema.ts
const __makeSchema_UserApplicationCreateManyUserInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      applicationId: z.string().max(24),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const UserApplicationCreateManyUserInputObjectSchema: z.ZodType<Prisma.UserApplicationCreateManyUserInput> =
  __makeSchema_UserApplicationCreateManyUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateManyUserInput>;
export const UserApplicationCreateManyUserInputObjectZodSchema =
  __makeSchema_UserApplicationCreateManyUserInput_schema();

// File: ApiKeyCreateManyUserInput.schema.ts
const __makeSchema_ApiKeyCreateManyUserInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      provider: z.string(),
      encryptedKey: z.string(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const ApiKeyCreateManyUserInputObjectSchema: z.ZodType<Prisma.ApiKeyCreateManyUserInput> =
  __makeSchema_ApiKeyCreateManyUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyCreateManyUserInput>;
export const ApiKeyCreateManyUserInputObjectZodSchema =
  __makeSchema_ApiKeyCreateManyUserInput_schema();

// File: DialogCreateManyUserInput.schema.ts
const __makeSchema_DialogCreateManyUserInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      dialogId: z.string(),
      title: z.string(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListCreateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const DialogCreateManyUserInputObjectSchema: z.ZodType<Prisma.DialogCreateManyUserInput> =
  __makeSchema_DialogCreateManyUserInput_schema() as unknown as z.ZodType<Prisma.DialogCreateManyUserInput>;
export const DialogCreateManyUserInputObjectZodSchema =
  __makeSchema_DialogCreateManyUserInput_schema();

// File: OAuthProviderUpdateInput.schema.ts
const __makeSchema_OAuthProviderUpdateInput_schema = () =>
  z
    .object({
      provider: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      providerId: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
    })
    .strict();
export const OAuthProviderUpdateInputObjectSchema: z.ZodType<Prisma.OAuthProviderUpdateInput> =
  __makeSchema_OAuthProviderUpdateInput_schema() as unknown as z.ZodType<Prisma.OAuthProviderUpdateInput>;
export const OAuthProviderUpdateInputObjectZodSchema =
  __makeSchema_OAuthProviderUpdateInput_schema();

// File: ApplicationUpdateWithoutOwnerInput.schema.ts
const __makeSchema_ApplicationUpdateWithoutOwnerInput_schema = () =>
  z
    .object({
      key: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      type: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => EnumApplicationTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPublished: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationUpdatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      icon: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      versions: z
        .lazy(() => ApplicationVersionUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
      userInstalls: z
        .lazy(() => UserApplicationUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUpdateWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateWithoutOwnerInput> =
  __makeSchema_ApplicationUpdateWithoutOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationUpdateWithoutOwnerInput>;
export const ApplicationUpdateWithoutOwnerInputObjectZodSchema =
  __makeSchema_ApplicationUpdateWithoutOwnerInput_schema();

// File: ApplicationUncheckedUpdateWithoutOwnerInput.schema.ts
const __makeSchema_ApplicationUncheckedUpdateWithoutOwnerInput_schema = () =>
  z
    .object({
      key: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      type: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => EnumApplicationTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPublished: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationUpdatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      icon: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      versions: z
        .lazy(() => ApplicationVersionUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
      userInstalls: z
        .lazy(() => UserApplicationUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const ApplicationUncheckedUpdateWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedUpdateWithoutOwnerInput> =
  __makeSchema_ApplicationUncheckedUpdateWithoutOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedUpdateWithoutOwnerInput>;
export const ApplicationUncheckedUpdateWithoutOwnerInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedUpdateWithoutOwnerInput_schema();

// File: ApplicationUncheckedUpdateManyWithoutOwnerInput.schema.ts
const __makeSchema_ApplicationUncheckedUpdateManyWithoutOwnerInput_schema = () =>
  z
    .object({
      key: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      name: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      type: z
        .union([
          ApplicationTypeSchema,
          z.lazy(() => EnumApplicationTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPublished: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([z.lazy(() => ApplicationUpdatepermissionsInputObjectSchema), z.string().array()])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
      icon: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApplicationUncheckedUpdateManyWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedUpdateManyWithoutOwnerInput> =
  __makeSchema_ApplicationUncheckedUpdateManyWithoutOwnerInput_schema() as unknown as z.ZodType<Prisma.ApplicationUncheckedUpdateManyWithoutOwnerInput>;
export const ApplicationUncheckedUpdateManyWithoutOwnerInputObjectZodSchema =
  __makeSchema_ApplicationUncheckedUpdateManyWithoutOwnerInput_schema();

// File: UserApplicationUpdateWithoutUserInput.schema.ts
const __makeSchema_UserApplicationUpdateWithoutUserInput_schema = () =>
  z
    .object({
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      application: z
        .lazy(() => ApplicationUpdateOneRequiredWithoutUserInstallsNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserApplicationUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserApplicationUpdateWithoutUserInput> =
  __makeSchema_UserApplicationUpdateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpdateWithoutUserInput>;
export const UserApplicationUpdateWithoutUserInputObjectZodSchema =
  __makeSchema_UserApplicationUpdateWithoutUserInput_schema();

// File: UserApplicationUncheckedUpdateWithoutUserInput.schema.ts
const __makeSchema_UserApplicationUncheckedUpdateWithoutUserInput_schema = () =>
  z
    .object({
      applicationId: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedUpdateWithoutUserInput> =
  __makeSchema_UserApplicationUncheckedUpdateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedUpdateWithoutUserInput>;
export const UserApplicationUncheckedUpdateWithoutUserInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedUpdateWithoutUserInput_schema();

// File: UserApplicationUncheckedUpdateManyWithoutUserInput.schema.ts
const __makeSchema_UserApplicationUncheckedUpdateManyWithoutUserInput_schema = () =>
  z
    .object({
      applicationId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedUpdateManyWithoutUserInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedUpdateManyWithoutUserInput> =
  __makeSchema_UserApplicationUncheckedUpdateManyWithoutUserInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedUpdateManyWithoutUserInput>;
export const UserApplicationUncheckedUpdateManyWithoutUserInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedUpdateManyWithoutUserInput_schema();

// File: ApiKeyUpdateWithoutUserInput.schema.ts
const __makeSchema_ApiKeyUpdateWithoutUserInput_schema = () =>
  z
    .object({
      provider: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      encryptedKey: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApiKeyUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.ApiKeyUpdateWithoutUserInput> =
  __makeSchema_ApiKeyUpdateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUpdateWithoutUserInput>;
export const ApiKeyUpdateWithoutUserInputObjectZodSchema =
  __makeSchema_ApiKeyUpdateWithoutUserInput_schema();

// File: ApiKeyUncheckedUpdateWithoutUserInput.schema.ts
const __makeSchema_ApiKeyUncheckedUpdateWithoutUserInput_schema = () =>
  z
    .object({
      provider: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      encryptedKey: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApiKeyUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.ApiKeyUncheckedUpdateWithoutUserInput> =
  __makeSchema_ApiKeyUncheckedUpdateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUncheckedUpdateWithoutUserInput>;
export const ApiKeyUncheckedUpdateWithoutUserInputObjectZodSchema =
  __makeSchema_ApiKeyUncheckedUpdateWithoutUserInput_schema();

// File: ApiKeyUncheckedUpdateManyWithoutUserInput.schema.ts
const __makeSchema_ApiKeyUncheckedUpdateManyWithoutUserInput_schema = () =>
  z
    .object({
      provider: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      encryptedKey: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApiKeyUncheckedUpdateManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ApiKeyUncheckedUpdateManyWithoutUserInput> =
  __makeSchema_ApiKeyUncheckedUpdateManyWithoutUserInput_schema() as unknown as z.ZodType<Prisma.ApiKeyUncheckedUpdateManyWithoutUserInput>;
export const ApiKeyUncheckedUpdateManyWithoutUserInputObjectZodSchema =
  __makeSchema_ApiKeyUncheckedUpdateManyWithoutUserInput_schema();

// File: DialogUpdateWithoutUserInput.schema.ts
const __makeSchema_DialogUpdateWithoutUserInput_schema = () =>
  z
    .object({
      dialogId: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      title: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const DialogUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.DialogUpdateWithoutUserInput> =
  __makeSchema_DialogUpdateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.DialogUpdateWithoutUserInput>;
export const DialogUpdateWithoutUserInputObjectZodSchema =
  __makeSchema_DialogUpdateWithoutUserInput_schema();

// File: DialogUncheckedUpdateWithoutUserInput.schema.ts
const __makeSchema_DialogUncheckedUpdateWithoutUserInput_schema = () =>
  z
    .object({
      dialogId: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      title: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const DialogUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.DialogUncheckedUpdateWithoutUserInput> =
  __makeSchema_DialogUncheckedUpdateWithoutUserInput_schema() as unknown as z.ZodType<Prisma.DialogUncheckedUpdateWithoutUserInput>;
export const DialogUncheckedUpdateWithoutUserInputObjectZodSchema =
  __makeSchema_DialogUncheckedUpdateWithoutUserInput_schema();

// File: DialogUncheckedUpdateManyWithoutUserInput.schema.ts
const __makeSchema_DialogUncheckedUpdateManyWithoutUserInput_schema = () =>
  z
    .object({
      dialogId: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      title: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      messages: z
        .union([
          z.lazy(() => ChatMessageListUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema),
          z.lazy(() => ChatMessageCreateInputObjectSchema).array(),
        ])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const DialogUncheckedUpdateManyWithoutUserInputObjectSchema: z.ZodType<Prisma.DialogUncheckedUpdateManyWithoutUserInput> =
  __makeSchema_DialogUncheckedUpdateManyWithoutUserInput_schema() as unknown as z.ZodType<Prisma.DialogUncheckedUpdateManyWithoutUserInput>;
export const DialogUncheckedUpdateManyWithoutUserInputObjectZodSchema =
  __makeSchema_DialogUncheckedUpdateManyWithoutUserInput_schema();

// File: ApplicationVersionCreateManyApplicationInput.schema.ts
const __makeSchema_ApplicationVersionCreateManyApplicationInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      version: z.string(),
      status: ApplicationStatusSchema.optional(),
      releaseNotes: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionCreatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableCreateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: jsonSchema.optional().nullable(),
    })
    .strict();
export const ApplicationVersionCreateManyApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionCreateManyApplicationInput> =
  __makeSchema_ApplicationVersionCreateManyApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionCreateManyApplicationInput>;
export const ApplicationVersionCreateManyApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionCreateManyApplicationInput_schema();

// File: UserApplicationCreateManyApplicationInput.schema.ts
const __makeSchema_UserApplicationCreateManyApplicationInput_schema = () =>
  z
    .object({
      id: z.string().max(24).optional(),
      userId: z.string().max(24),
      createdAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
      updatedAt: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
        .transform((v) => new Date(v))
        .optional(),
    })
    .strict();
export const UserApplicationCreateManyApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationCreateManyApplicationInput> =
  __makeSchema_UserApplicationCreateManyApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCreateManyApplicationInput>;
export const UserApplicationCreateManyApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationCreateManyApplicationInput_schema();

// File: ApplicationEntryPointsUpdateInput.schema.ts
const __makeSchema_ApplicationEntryPointsUpdateInput_schema = () =>
  z
    .object({
      frontend: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      backend: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
    })
    .strict();
export const ApplicationEntryPointsUpdateInputObjectSchema: z.ZodType<Prisma.ApplicationEntryPointsUpdateInput> =
  __makeSchema_ApplicationEntryPointsUpdateInput_schema() as unknown as z.ZodType<Prisma.ApplicationEntryPointsUpdateInput>;
export const ApplicationEntryPointsUpdateInputObjectZodSchema =
  __makeSchema_ApplicationEntryPointsUpdateInput_schema();

// File: ApplicationStorageMetaUpdateInput.schema.ts
const __makeSchema_ApplicationStorageMetaUpdateInput_schema = () =>
  z
    .object({
      rootDir: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      archivePath: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      contentPath: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      manifestPath: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
    })
    .strict();
export const ApplicationStorageMetaUpdateInputObjectSchema: z.ZodType<Prisma.ApplicationStorageMetaUpdateInput> =
  __makeSchema_ApplicationStorageMetaUpdateInput_schema() as unknown as z.ZodType<Prisma.ApplicationStorageMetaUpdateInput>;
export const ApplicationStorageMetaUpdateInputObjectZodSchema =
  __makeSchema_ApplicationStorageMetaUpdateInput_schema();

// File: ApplicationVersionUpdateWithoutApplicationInput.schema.ts
const __makeSchema_ApplicationVersionUpdateWithoutApplicationInput_schema = () =>
  z
    .object({
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      releaseNotes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionUpdatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
    })
    .strict();
export const ApplicationVersionUpdateWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUpdateWithoutApplicationInput> =
  __makeSchema_ApplicationVersionUpdateWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUpdateWithoutApplicationInput>;
export const ApplicationVersionUpdateWithoutApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionUpdateWithoutApplicationInput_schema();

// File: ApplicationVersionUncheckedUpdateWithoutApplicationInput.schema.ts
const __makeSchema_ApplicationVersionUncheckedUpdateWithoutApplicationInput_schema = () =>
  z
    .object({
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      releaseNotes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionUpdatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
    })
    .strict();
export const ApplicationVersionUncheckedUpdateWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUncheckedUpdateWithoutApplicationInput> =
  __makeSchema_ApplicationVersionUncheckedUpdateWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUncheckedUpdateWithoutApplicationInput>;
export const ApplicationVersionUncheckedUpdateWithoutApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionUncheckedUpdateWithoutApplicationInput_schema();

// File: ApplicationVersionUncheckedUpdateManyWithoutApplicationInput.schema.ts
const __makeSchema_ApplicationVersionUncheckedUpdateManyWithoutApplicationInput_schema = () =>
  z
    .object({
      version: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      status: z
        .union([
          ApplicationStatusSchema,
          z.lazy(() => EnumApplicationStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      releaseNotes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      entryPoints: z
        .union([
          z.lazy(() => ApplicationEntryPointsNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationEntryPointsCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      permissions: z
        .union([
          z.lazy(() => ApplicationVersionUpdatepermissionsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      storage: z
        .union([
          z.lazy(() => ApplicationStorageMetaNullableUpdateEnvelopeInputObjectSchema),
          z.lazy(() => ApplicationStorageMetaCreateInputObjectSchema),
        ])
        .optional()
        .nullable(),
      manifest: z.union([jsonSchema, jsonSchema]).optional().nullable(),
    })
    .strict();
export const ApplicationVersionUncheckedUpdateManyWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationVersionUncheckedUpdateManyWithoutApplicationInput> =
  __makeSchema_ApplicationVersionUncheckedUpdateManyWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionUncheckedUpdateManyWithoutApplicationInput>;
export const ApplicationVersionUncheckedUpdateManyWithoutApplicationInputObjectZodSchema =
  __makeSchema_ApplicationVersionUncheckedUpdateManyWithoutApplicationInput_schema();

// File: UserApplicationUpdateWithoutApplicationInput.schema.ts
const __makeSchema_UserApplicationUpdateWithoutApplicationInput_schema = () =>
  z
    .object({
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      user: z.lazy(() => UserUpdateOneRequiredWithoutInstallsNestedInputObjectSchema).optional(),
    })
    .strict();
export const UserApplicationUpdateWithoutApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationUpdateWithoutApplicationInput> =
  __makeSchema_UserApplicationUpdateWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUpdateWithoutApplicationInput>;
export const UserApplicationUpdateWithoutApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationUpdateWithoutApplicationInput_schema();

// File: UserApplicationUncheckedUpdateWithoutApplicationInput.schema.ts
const __makeSchema_UserApplicationUncheckedUpdateWithoutApplicationInput_schema = () =>
  z
    .object({
      userId: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedUpdateWithoutApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedUpdateWithoutApplicationInput> =
  __makeSchema_UserApplicationUncheckedUpdateWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedUpdateWithoutApplicationInput>;
export const UserApplicationUncheckedUpdateWithoutApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedUpdateWithoutApplicationInput_schema();

// File: UserApplicationUncheckedUpdateManyWithoutApplicationInput.schema.ts
const __makeSchema_UserApplicationUncheckedUpdateManyWithoutApplicationInput_schema = () =>
  z
    .object({
      userId: z
        .union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserApplicationUncheckedUpdateManyWithoutApplicationInputObjectSchema: z.ZodType<Prisma.UserApplicationUncheckedUpdateManyWithoutApplicationInput> =
  __makeSchema_UserApplicationUncheckedUpdateManyWithoutApplicationInput_schema() as unknown as z.ZodType<Prisma.UserApplicationUncheckedUpdateManyWithoutApplicationInput>;
export const UserApplicationUncheckedUpdateManyWithoutApplicationInputObjectZodSchema =
  __makeSchema_UserApplicationUncheckedUpdateManyWithoutApplicationInput_schema();

// File: ModelSceneSettingsUpdateInput.schema.ts
const __makeSchema_ModelSceneSettingsUpdateInput_schema = () =>
  z
    .object({
      modelPath: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      sceneName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      enableToonShader: z
        .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      lightIntensity: z
        .union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      cameraDistance: z
        .union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      animationSpeed: z
        .union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
    })
    .strict();
export const ModelSceneSettingsUpdateInputObjectSchema: z.ZodType<Prisma.ModelSceneSettingsUpdateInput> =
  __makeSchema_ModelSceneSettingsUpdateInput_schema() as unknown as z.ZodType<Prisma.ModelSceneSettingsUpdateInput>;
export const ModelSceneSettingsUpdateInputObjectZodSchema =
  __makeSchema_ModelSceneSettingsUpdateInput_schema();

// File: ChatMessageUpdateInput.schema.ts
const __makeSchema_ChatMessageUpdateInput_schema = () =>
  z
    .object({
      id: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      position: z
        .union([
          MessagePositionSchema,
          z.lazy(() => EnumMessagePositionFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      type: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      text: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      date: z
        .union([
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'Invalid ISO datetime')
            .transform((v) => new Date(v)),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ChatMessageUpdateInputObjectSchema: z.ZodType<Prisma.ChatMessageUpdateInput> =
  __makeSchema_ChatMessageUpdateInput_schema() as unknown as z.ZodType<Prisma.ChatMessageUpdateInput>;
export const ChatMessageUpdateInputObjectZodSchema = __makeSchema_ChatMessageUpdateInput_schema();

// File: NestedBoolNullableFilter.schema.ts

const nestedboolnullablefilterSchema = z
  .object({
    equals: z.boolean().optional().nullable(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolNullableFilterObjectSchema)])
      .optional()
      .nullable(),
    isSet: z.boolean().optional(),
  })
  .strict();
export const NestedBoolNullableFilterObjectSchema: z.ZodType<Prisma.NestedBoolNullableFilter> =
  nestedboolnullablefilterSchema as unknown as z.ZodType<Prisma.NestedBoolNullableFilter>;
export const NestedBoolNullableFilterObjectZodSchema = nestedboolnullablefilterSchema;

// File: NestedFloatNullableFilter.schema.ts

const nestedfloatnullablefilterSchema = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatNullableFilterObjectSchema)])
      .optional()
      .nullable(),
    isSet: z.boolean().optional(),
  })
  .strict();
export const NestedFloatNullableFilterObjectSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  nestedfloatnullablefilterSchema as unknown as z.ZodType<Prisma.NestedFloatNullableFilter>;
export const NestedFloatNullableFilterObjectZodSchema = nestedfloatnullablefilterSchema;

// File: NestedEnumMessagePositionFilter.schema.ts

const nestedenummessagepositionfilterSchema = z
  .object({
    equals: MessagePositionSchema.optional(),
    in: MessagePositionSchema.array().optional(),
    notIn: MessagePositionSchema.array().optional(),
    not: z
      .union([MessagePositionSchema, z.lazy(() => NestedEnumMessagePositionFilterObjectSchema)])
      .optional(),
  })
  .strict();
export const NestedEnumMessagePositionFilterObjectSchema: z.ZodType<Prisma.NestedEnumMessagePositionFilter> =
  nestedenummessagepositionfilterSchema as unknown as z.ZodType<Prisma.NestedEnumMessagePositionFilter>;
export const NestedEnumMessagePositionFilterObjectZodSchema = nestedenummessagepositionfilterSchema;

// File: NullableBoolFieldUpdateOperationsInput.schema.ts
const __makeSchema_NullableBoolFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: z.boolean().optional(),
      unset: z.boolean().optional(),
    })
    .strict();
export const NullableBoolFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> =
  __makeSchema_NullableBoolFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput>;
export const NullableBoolFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_NullableBoolFieldUpdateOperationsInput_schema();

// File: NullableFloatFieldUpdateOperationsInput.schema.ts
const __makeSchema_NullableFloatFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
      unset: z.boolean().optional(),
    })
    .strict();
export const NullableFloatFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> =
  __makeSchema_NullableFloatFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput>;
export const NullableFloatFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_NullableFloatFieldUpdateOperationsInput_schema();

// File: EnumMessagePositionFieldUpdateOperationsInput.schema.ts
const __makeSchema_EnumMessagePositionFieldUpdateOperationsInput_schema = () =>
  z
    .object({
      set: MessagePositionSchema.optional(),
    })
    .strict();
export const EnumMessagePositionFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumMessagePositionFieldUpdateOperationsInput> =
  __makeSchema_EnumMessagePositionFieldUpdateOperationsInput_schema() as unknown as z.ZodType<Prisma.EnumMessagePositionFieldUpdateOperationsInput>;
export const EnumMessagePositionFieldUpdateOperationsInputObjectZodSchema =
  __makeSchema_EnumMessagePositionFieldUpdateOperationsInput_schema();

// File: findUserRaw.schema.ts
const __makeSchema_findUserRaw_schema = () =>
  z
    .object({
      filter: jsonSchema.optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const UserFindRawObjectSchema = __makeSchema_findUserRaw_schema();
export const UserFindRawObjectZodSchema = __makeSchema_findUserRaw_schema();

// File: aggregateUserRaw.schema.ts
const __makeSchema_aggregateUserRaw_schema = () =>
  z
    .object({
      pipeline: jsonSchema.array().optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const UserAggregateRawObjectSchema = __makeSchema_aggregateUserRaw_schema();
export const UserAggregateRawObjectZodSchema = __makeSchema_aggregateUserRaw_schema();

// File: findApplicationRaw.schema.ts
const __makeSchema_findApplicationRaw_schema = () =>
  z
    .object({
      filter: jsonSchema.optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const ApplicationFindRawObjectSchema = __makeSchema_findApplicationRaw_schema();
export const ApplicationFindRawObjectZodSchema = __makeSchema_findApplicationRaw_schema();

// File: aggregateApplicationRaw.schema.ts
const __makeSchema_aggregateApplicationRaw_schema = () =>
  z
    .object({
      pipeline: jsonSchema.array().optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const ApplicationAggregateRawObjectSchema = __makeSchema_aggregateApplicationRaw_schema();
export const ApplicationAggregateRawObjectZodSchema = __makeSchema_aggregateApplicationRaw_schema();

// File: findApplicationVersionRaw.schema.ts
const __makeSchema_findApplicationVersionRaw_schema = () =>
  z
    .object({
      filter: jsonSchema.optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const ApplicationVersionFindRawObjectSchema =
  __makeSchema_findApplicationVersionRaw_schema();
export const ApplicationVersionFindRawObjectZodSchema =
  __makeSchema_findApplicationVersionRaw_schema();

// File: aggregateApplicationVersionRaw.schema.ts
const __makeSchema_aggregateApplicationVersionRaw_schema = () =>
  z
    .object({
      pipeline: jsonSchema.array().optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const ApplicationVersionAggregateRawObjectSchema =
  __makeSchema_aggregateApplicationVersionRaw_schema();
export const ApplicationVersionAggregateRawObjectZodSchema =
  __makeSchema_aggregateApplicationVersionRaw_schema();

// File: findUserApplicationRaw.schema.ts
const __makeSchema_findUserApplicationRaw_schema = () =>
  z
    .object({
      filter: jsonSchema.optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const UserApplicationFindRawObjectSchema = __makeSchema_findUserApplicationRaw_schema();
export const UserApplicationFindRawObjectZodSchema = __makeSchema_findUserApplicationRaw_schema();

// File: aggregateUserApplicationRaw.schema.ts
const __makeSchema_aggregateUserApplicationRaw_schema = () =>
  z
    .object({
      pipeline: jsonSchema.array().optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const UserApplicationAggregateRawObjectSchema =
  __makeSchema_aggregateUserApplicationRaw_schema();
export const UserApplicationAggregateRawObjectZodSchema =
  __makeSchema_aggregateUserApplicationRaw_schema();

// File: findApiKeyRaw.schema.ts
const __makeSchema_findApiKeyRaw_schema = () =>
  z
    .object({
      filter: jsonSchema.optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const ApiKeyFindRawObjectSchema = __makeSchema_findApiKeyRaw_schema();
export const ApiKeyFindRawObjectZodSchema = __makeSchema_findApiKeyRaw_schema();

// File: aggregateApiKeyRaw.schema.ts
const __makeSchema_aggregateApiKeyRaw_schema = () =>
  z
    .object({
      pipeline: jsonSchema.array().optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const ApiKeyAggregateRawObjectSchema = __makeSchema_aggregateApiKeyRaw_schema();
export const ApiKeyAggregateRawObjectZodSchema = __makeSchema_aggregateApiKeyRaw_schema();

// File: findSettingsRaw.schema.ts
const __makeSchema_findSettingsRaw_schema = () =>
  z
    .object({
      filter: jsonSchema.optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const SettingsFindRawObjectSchema = __makeSchema_findSettingsRaw_schema();
export const SettingsFindRawObjectZodSchema = __makeSchema_findSettingsRaw_schema();

// File: aggregateSettingsRaw.schema.ts
const __makeSchema_aggregateSettingsRaw_schema = () =>
  z
    .object({
      pipeline: jsonSchema.array().optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const SettingsAggregateRawObjectSchema = __makeSchema_aggregateSettingsRaw_schema();
export const SettingsAggregateRawObjectZodSchema = __makeSchema_aggregateSettingsRaw_schema();

// File: findDialogRaw.schema.ts
const __makeSchema_findDialogRaw_schema = () =>
  z
    .object({
      filter: jsonSchema.optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const DialogFindRawObjectSchema = __makeSchema_findDialogRaw_schema();
export const DialogFindRawObjectZodSchema = __makeSchema_findDialogRaw_schema();

// File: aggregateDialogRaw.schema.ts
const __makeSchema_aggregateDialogRaw_schema = () =>
  z
    .object({
      pipeline: jsonSchema.array().optional(),
      options: jsonSchema.optional(),
    })
    .strict();
export const DialogAggregateRawObjectSchema = __makeSchema_aggregateDialogRaw_schema();
export const DialogAggregateRawObjectZodSchema = __makeSchema_aggregateDialogRaw_schema();

// File: UserCountAggregateInput.schema.ts
const __makeSchema_UserCountAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      email: z.literal(true).optional(),
      password: z.literal(true).optional(),
      name: z.literal(true).optional(),
      resetPasswordToken: z.literal(true).optional(),
      resetPasswordExpires: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const UserCountAggregateInputObjectSchema: z.ZodType<Prisma.UserCountAggregateInputType> =
  __makeSchema_UserCountAggregateInput_schema() as unknown as z.ZodType<Prisma.UserCountAggregateInputType>;
export const UserCountAggregateInputObjectZodSchema = __makeSchema_UserCountAggregateInput_schema();

// File: UserMinAggregateInput.schema.ts
const __makeSchema_UserMinAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      email: z.literal(true).optional(),
      password: z.literal(true).optional(),
      name: z.literal(true).optional(),
      resetPasswordToken: z.literal(true).optional(),
      resetPasswordExpires: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const UserMinAggregateInputObjectSchema: z.ZodType<Prisma.UserMinAggregateInputType> =
  __makeSchema_UserMinAggregateInput_schema() as unknown as z.ZodType<Prisma.UserMinAggregateInputType>;
export const UserMinAggregateInputObjectZodSchema = __makeSchema_UserMinAggregateInput_schema();

// File: UserMaxAggregateInput.schema.ts
const __makeSchema_UserMaxAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      email: z.literal(true).optional(),
      password: z.literal(true).optional(),
      name: z.literal(true).optional(),
      resetPasswordToken: z.literal(true).optional(),
      resetPasswordExpires: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const UserMaxAggregateInputObjectSchema: z.ZodType<Prisma.UserMaxAggregateInputType> =
  __makeSchema_UserMaxAggregateInput_schema() as unknown as z.ZodType<Prisma.UserMaxAggregateInputType>;
export const UserMaxAggregateInputObjectZodSchema = __makeSchema_UserMaxAggregateInput_schema();

// File: ApplicationCountAggregateInput.schema.ts
const __makeSchema_ApplicationCountAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      key: z.literal(true).optional(),
      name: z.literal(true).optional(),
      version: z.literal(true).optional(),
      type: z.literal(true).optional(),
      description: z.literal(true).optional(),
      status: z.literal(true).optional(),
      isPublished: z.literal(true).optional(),
      ownerId: z.literal(true).optional(),
      permissions: z.literal(true).optional(),
      manifest: z.literal(true).optional(),
      icon: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const ApplicationCountAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationCountAggregateInputType> =
  __makeSchema_ApplicationCountAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationCountAggregateInputType>;
export const ApplicationCountAggregateInputObjectZodSchema =
  __makeSchema_ApplicationCountAggregateInput_schema();

// File: ApplicationMinAggregateInput.schema.ts
const __makeSchema_ApplicationMinAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      key: z.literal(true).optional(),
      name: z.literal(true).optional(),
      version: z.literal(true).optional(),
      type: z.literal(true).optional(),
      description: z.literal(true).optional(),
      status: z.literal(true).optional(),
      isPublished: z.literal(true).optional(),
      ownerId: z.literal(true).optional(),
      icon: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const ApplicationMinAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationMinAggregateInputType> =
  __makeSchema_ApplicationMinAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationMinAggregateInputType>;
export const ApplicationMinAggregateInputObjectZodSchema =
  __makeSchema_ApplicationMinAggregateInput_schema();

// File: ApplicationMaxAggregateInput.schema.ts
const __makeSchema_ApplicationMaxAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      key: z.literal(true).optional(),
      name: z.literal(true).optional(),
      version: z.literal(true).optional(),
      type: z.literal(true).optional(),
      description: z.literal(true).optional(),
      status: z.literal(true).optional(),
      isPublished: z.literal(true).optional(),
      ownerId: z.literal(true).optional(),
      icon: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const ApplicationMaxAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationMaxAggregateInputType> =
  __makeSchema_ApplicationMaxAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationMaxAggregateInputType>;
export const ApplicationMaxAggregateInputObjectZodSchema =
  __makeSchema_ApplicationMaxAggregateInput_schema();

// File: ApplicationVersionCountAggregateInput.schema.ts
const __makeSchema_ApplicationVersionCountAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      applicationId: z.literal(true).optional(),
      version: z.literal(true).optional(),
      status: z.literal(true).optional(),
      releaseNotes: z.literal(true).optional(),
      description: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      permissions: z.literal(true).optional(),
      manifest: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const ApplicationVersionCountAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationVersionCountAggregateInputType> =
  __makeSchema_ApplicationVersionCountAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionCountAggregateInputType>;
export const ApplicationVersionCountAggregateInputObjectZodSchema =
  __makeSchema_ApplicationVersionCountAggregateInput_schema();

// File: ApplicationVersionMinAggregateInput.schema.ts
const __makeSchema_ApplicationVersionMinAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      applicationId: z.literal(true).optional(),
      version: z.literal(true).optional(),
      status: z.literal(true).optional(),
      releaseNotes: z.literal(true).optional(),
      description: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
    })
    .strict();
export const ApplicationVersionMinAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationVersionMinAggregateInputType> =
  __makeSchema_ApplicationVersionMinAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionMinAggregateInputType>;
export const ApplicationVersionMinAggregateInputObjectZodSchema =
  __makeSchema_ApplicationVersionMinAggregateInput_schema();

// File: ApplicationVersionMaxAggregateInput.schema.ts
const __makeSchema_ApplicationVersionMaxAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      applicationId: z.literal(true).optional(),
      version: z.literal(true).optional(),
      status: z.literal(true).optional(),
      releaseNotes: z.literal(true).optional(),
      description: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
    })
    .strict();
export const ApplicationVersionMaxAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationVersionMaxAggregateInputType> =
  __makeSchema_ApplicationVersionMaxAggregateInput_schema() as unknown as z.ZodType<Prisma.ApplicationVersionMaxAggregateInputType>;
export const ApplicationVersionMaxAggregateInputObjectZodSchema =
  __makeSchema_ApplicationVersionMaxAggregateInput_schema();

// File: UserApplicationCountAggregateInput.schema.ts
const __makeSchema_UserApplicationCountAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      applicationId: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const UserApplicationCountAggregateInputObjectSchema: z.ZodType<Prisma.UserApplicationCountAggregateInputType> =
  __makeSchema_UserApplicationCountAggregateInput_schema() as unknown as z.ZodType<Prisma.UserApplicationCountAggregateInputType>;
export const UserApplicationCountAggregateInputObjectZodSchema =
  __makeSchema_UserApplicationCountAggregateInput_schema();

// File: UserApplicationMinAggregateInput.schema.ts
const __makeSchema_UserApplicationMinAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      applicationId: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const UserApplicationMinAggregateInputObjectSchema: z.ZodType<Prisma.UserApplicationMinAggregateInputType> =
  __makeSchema_UserApplicationMinAggregateInput_schema() as unknown as z.ZodType<Prisma.UserApplicationMinAggregateInputType>;
export const UserApplicationMinAggregateInputObjectZodSchema =
  __makeSchema_UserApplicationMinAggregateInput_schema();

// File: UserApplicationMaxAggregateInput.schema.ts
const __makeSchema_UserApplicationMaxAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      applicationId: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const UserApplicationMaxAggregateInputObjectSchema: z.ZodType<Prisma.UserApplicationMaxAggregateInputType> =
  __makeSchema_UserApplicationMaxAggregateInput_schema() as unknown as z.ZodType<Prisma.UserApplicationMaxAggregateInputType>;
export const UserApplicationMaxAggregateInputObjectZodSchema =
  __makeSchema_UserApplicationMaxAggregateInput_schema();

// File: ApiKeyCountAggregateInput.schema.ts
const __makeSchema_ApiKeyCountAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      provider: z.literal(true).optional(),
      encryptedKey: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const ApiKeyCountAggregateInputObjectSchema: z.ZodType<Prisma.ApiKeyCountAggregateInputType> =
  __makeSchema_ApiKeyCountAggregateInput_schema() as unknown as z.ZodType<Prisma.ApiKeyCountAggregateInputType>;
export const ApiKeyCountAggregateInputObjectZodSchema =
  __makeSchema_ApiKeyCountAggregateInput_schema();

// File: ApiKeyMinAggregateInput.schema.ts
const __makeSchema_ApiKeyMinAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      provider: z.literal(true).optional(),
      encryptedKey: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const ApiKeyMinAggregateInputObjectSchema: z.ZodType<Prisma.ApiKeyMinAggregateInputType> =
  __makeSchema_ApiKeyMinAggregateInput_schema() as unknown as z.ZodType<Prisma.ApiKeyMinAggregateInputType>;
export const ApiKeyMinAggregateInputObjectZodSchema = __makeSchema_ApiKeyMinAggregateInput_schema();

// File: ApiKeyMaxAggregateInput.schema.ts
const __makeSchema_ApiKeyMaxAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      provider: z.literal(true).optional(),
      encryptedKey: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const ApiKeyMaxAggregateInputObjectSchema: z.ZodType<Prisma.ApiKeyMaxAggregateInputType> =
  __makeSchema_ApiKeyMaxAggregateInput_schema() as unknown as z.ZodType<Prisma.ApiKeyMaxAggregateInputType>;
export const ApiKeyMaxAggregateInputObjectZodSchema = __makeSchema_ApiKeyMaxAggregateInput_schema();

// File: SettingsCountAggregateInput.schema.ts
const __makeSchema_SettingsCountAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      volume: z.literal(true).optional(),
      language: z.literal(true).optional(),
      theme: z.literal(true).optional(),
      accentColorLight: z.literal(true).optional(),
      accentColorDark: z.literal(true).optional(),
      sttProviderName: z.literal(true).optional(),
      llmProviderName: z.literal(true).optional(),
      llmModel: z.literal(true).optional(),
      ttsProviderName: z.literal(true).optional(),
      welcomeTitle: z.literal(true).optional(),
      idleTimeoutSeconds: z.literal(true).optional(),
      idleMode: z.literal(true).optional(),
      idleCustomImagePath: z.literal(true).optional(),
      idleRemoteEndpoint: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const SettingsCountAggregateInputObjectSchema: z.ZodType<Prisma.SettingsCountAggregateInputType> =
  __makeSchema_SettingsCountAggregateInput_schema() as unknown as z.ZodType<Prisma.SettingsCountAggregateInputType>;
export const SettingsCountAggregateInputObjectZodSchema =
  __makeSchema_SettingsCountAggregateInput_schema();

// File: SettingsAvgAggregateInput.schema.ts
const __makeSchema_SettingsAvgAggregateInput_schema = () =>
  z
    .object({
      volume: z.literal(true).optional(),
      idleTimeoutSeconds: z.literal(true).optional(),
    })
    .strict();
export const SettingsAvgAggregateInputObjectSchema: z.ZodType<Prisma.SettingsAvgAggregateInputType> =
  __makeSchema_SettingsAvgAggregateInput_schema() as unknown as z.ZodType<Prisma.SettingsAvgAggregateInputType>;
export const SettingsAvgAggregateInputObjectZodSchema =
  __makeSchema_SettingsAvgAggregateInput_schema();

// File: SettingsSumAggregateInput.schema.ts
const __makeSchema_SettingsSumAggregateInput_schema = () =>
  z
    .object({
      volume: z.literal(true).optional(),
      idleTimeoutSeconds: z.literal(true).optional(),
    })
    .strict();
export const SettingsSumAggregateInputObjectSchema: z.ZodType<Prisma.SettingsSumAggregateInputType> =
  __makeSchema_SettingsSumAggregateInput_schema() as unknown as z.ZodType<Prisma.SettingsSumAggregateInputType>;
export const SettingsSumAggregateInputObjectZodSchema =
  __makeSchema_SettingsSumAggregateInput_schema();

// File: SettingsMinAggregateInput.schema.ts
const __makeSchema_SettingsMinAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      volume: z.literal(true).optional(),
      language: z.literal(true).optional(),
      theme: z.literal(true).optional(),
      accentColorLight: z.literal(true).optional(),
      accentColorDark: z.literal(true).optional(),
      sttProviderName: z.literal(true).optional(),
      llmProviderName: z.literal(true).optional(),
      llmModel: z.literal(true).optional(),
      ttsProviderName: z.literal(true).optional(),
      welcomeTitle: z.literal(true).optional(),
      idleTimeoutSeconds: z.literal(true).optional(),
      idleMode: z.literal(true).optional(),
      idleCustomImagePath: z.literal(true).optional(),
      idleRemoteEndpoint: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const SettingsMinAggregateInputObjectSchema: z.ZodType<Prisma.SettingsMinAggregateInputType> =
  __makeSchema_SettingsMinAggregateInput_schema() as unknown as z.ZodType<Prisma.SettingsMinAggregateInputType>;
export const SettingsMinAggregateInputObjectZodSchema =
  __makeSchema_SettingsMinAggregateInput_schema();

// File: SettingsMaxAggregateInput.schema.ts
const __makeSchema_SettingsMaxAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      volume: z.literal(true).optional(),
      language: z.literal(true).optional(),
      theme: z.literal(true).optional(),
      accentColorLight: z.literal(true).optional(),
      accentColorDark: z.literal(true).optional(),
      sttProviderName: z.literal(true).optional(),
      llmProviderName: z.literal(true).optional(),
      llmModel: z.literal(true).optional(),
      ttsProviderName: z.literal(true).optional(),
      welcomeTitle: z.literal(true).optional(),
      idleTimeoutSeconds: z.literal(true).optional(),
      idleMode: z.literal(true).optional(),
      idleCustomImagePath: z.literal(true).optional(),
      idleRemoteEndpoint: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const SettingsMaxAggregateInputObjectSchema: z.ZodType<Prisma.SettingsMaxAggregateInputType> =
  __makeSchema_SettingsMaxAggregateInput_schema() as unknown as z.ZodType<Prisma.SettingsMaxAggregateInputType>;
export const SettingsMaxAggregateInputObjectZodSchema =
  __makeSchema_SettingsMaxAggregateInput_schema();

// File: DialogCountAggregateInput.schema.ts
const __makeSchema_DialogCountAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      dialogId: z.literal(true).optional(),
      title: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const DialogCountAggregateInputObjectSchema: z.ZodType<Prisma.DialogCountAggregateInputType> =
  __makeSchema_DialogCountAggregateInput_schema() as unknown as z.ZodType<Prisma.DialogCountAggregateInputType>;
export const DialogCountAggregateInputObjectZodSchema =
  __makeSchema_DialogCountAggregateInput_schema();

// File: DialogMinAggregateInput.schema.ts
const __makeSchema_DialogMinAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      dialogId: z.literal(true).optional(),
      title: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const DialogMinAggregateInputObjectSchema: z.ZodType<Prisma.DialogMinAggregateInputType> =
  __makeSchema_DialogMinAggregateInput_schema() as unknown as z.ZodType<Prisma.DialogMinAggregateInputType>;
export const DialogMinAggregateInputObjectZodSchema = __makeSchema_DialogMinAggregateInput_schema();

// File: DialogMaxAggregateInput.schema.ts
const __makeSchema_DialogMaxAggregateInput_schema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      dialogId: z.literal(true).optional(),
      title: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const DialogMaxAggregateInputObjectSchema: z.ZodType<Prisma.DialogMaxAggregateInputType> =
  __makeSchema_DialogMaxAggregateInput_schema() as unknown as z.ZodType<Prisma.DialogMaxAggregateInputType>;
export const DialogMaxAggregateInputObjectZodSchema = __makeSchema_DialogMaxAggregateInput_schema();

// File: UserCountOutputTypeSelect.schema.ts
const __makeSchema_UserCountOutputTypeSelect_schema = () =>
  z
    .object({
      applications: z
        .union([z.boolean(), z.lazy(() => UserCountOutputTypeCountApplicationsArgsObjectSchema)])
        .optional(),
      installs: z
        .union([z.boolean(), z.lazy(() => UserCountOutputTypeCountInstallsArgsObjectSchema)])
        .optional(),
      apiKeys: z
        .union([z.boolean(), z.lazy(() => UserCountOutputTypeCountApiKeysArgsObjectSchema)])
        .optional(),
      dialogs: z
        .union([z.boolean(), z.lazy(() => UserCountOutputTypeCountDialogsArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  __makeSchema_UserCountOutputTypeSelect_schema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema =
  __makeSchema_UserCountOutputTypeSelect_schema();

// File: ApplicationCountOutputTypeSelect.schema.ts
const __makeSchema_ApplicationCountOutputTypeSelect_schema = () =>
  z
    .object({
      versions: z
        .union([z.boolean(), z.lazy(() => ApplicationCountOutputTypeCountVersionsArgsObjectSchema)])
        .optional(),
      userInstalls: z
        .union([
          z.boolean(),
          z.lazy(() => ApplicationCountOutputTypeCountUserInstallsArgsObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const ApplicationCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ApplicationCountOutputTypeSelect> =
  __makeSchema_ApplicationCountOutputTypeSelect_schema() as unknown as z.ZodType<Prisma.ApplicationCountOutputTypeSelect>;
export const ApplicationCountOutputTypeSelectObjectZodSchema =
  __makeSchema_ApplicationCountOutputTypeSelect_schema();

// File: UserCountOutputTypeArgs.schema.ts
const __makeSchema_UserCountOutputTypeArgs_schema = () =>
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectObjectSchema).optional(),
    })
    .strict();
export const UserCountOutputTypeArgsObjectSchema = __makeSchema_UserCountOutputTypeArgs_schema();
export const UserCountOutputTypeArgsObjectZodSchema = __makeSchema_UserCountOutputTypeArgs_schema();

// File: UserCountOutputTypeCountApplicationsArgs.schema.ts
const __makeSchema_UserCountOutputTypeCountApplicationsArgs_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserCountOutputTypeCountApplicationsArgsObjectSchema =
  __makeSchema_UserCountOutputTypeCountApplicationsArgs_schema();
export const UserCountOutputTypeCountApplicationsArgsObjectZodSchema =
  __makeSchema_UserCountOutputTypeCountApplicationsArgs_schema();

// File: UserCountOutputTypeCountInstallsArgs.schema.ts
const __makeSchema_UserCountOutputTypeCountInstallsArgs_schema = () =>
  z
    .object({
      where: z.lazy(() => UserApplicationWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserCountOutputTypeCountInstallsArgsObjectSchema =
  __makeSchema_UserCountOutputTypeCountInstallsArgs_schema();
export const UserCountOutputTypeCountInstallsArgsObjectZodSchema =
  __makeSchema_UserCountOutputTypeCountInstallsArgs_schema();

// File: UserCountOutputTypeCountApiKeysArgs.schema.ts
const __makeSchema_UserCountOutputTypeCountApiKeysArgs_schema = () =>
  z
    .object({
      where: z.lazy(() => ApiKeyWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserCountOutputTypeCountApiKeysArgsObjectSchema =
  __makeSchema_UserCountOutputTypeCountApiKeysArgs_schema();
export const UserCountOutputTypeCountApiKeysArgsObjectZodSchema =
  __makeSchema_UserCountOutputTypeCountApiKeysArgs_schema();

// File: UserCountOutputTypeCountDialogsArgs.schema.ts
const __makeSchema_UserCountOutputTypeCountDialogsArgs_schema = () =>
  z
    .object({
      where: z.lazy(() => DialogWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserCountOutputTypeCountDialogsArgsObjectSchema =
  __makeSchema_UserCountOutputTypeCountDialogsArgs_schema();
export const UserCountOutputTypeCountDialogsArgsObjectZodSchema =
  __makeSchema_UserCountOutputTypeCountDialogsArgs_schema();

// File: ApplicationCountOutputTypeArgs.schema.ts
const __makeSchema_ApplicationCountOutputTypeArgs_schema = () =>
  z
    .object({
      select: z.lazy(() => ApplicationCountOutputTypeSelectObjectSchema).optional(),
    })
    .strict();
export const ApplicationCountOutputTypeArgsObjectSchema =
  __makeSchema_ApplicationCountOutputTypeArgs_schema();
export const ApplicationCountOutputTypeArgsObjectZodSchema =
  __makeSchema_ApplicationCountOutputTypeArgs_schema();

// File: ApplicationCountOutputTypeCountVersionsArgs.schema.ts
const __makeSchema_ApplicationCountOutputTypeCountVersionsArgs_schema = () =>
  z
    .object({
      where: z.lazy(() => ApplicationVersionWhereInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationCountOutputTypeCountVersionsArgsObjectSchema =
  __makeSchema_ApplicationCountOutputTypeCountVersionsArgs_schema();
export const ApplicationCountOutputTypeCountVersionsArgsObjectZodSchema =
  __makeSchema_ApplicationCountOutputTypeCountVersionsArgs_schema();

// File: ApplicationCountOutputTypeCountUserInstallsArgs.schema.ts
const __makeSchema_ApplicationCountOutputTypeCountUserInstallsArgs_schema = () =>
  z
    .object({
      where: z.lazy(() => UserApplicationWhereInputObjectSchema).optional(),
    })
    .strict();
export const ApplicationCountOutputTypeCountUserInstallsArgsObjectSchema =
  __makeSchema_ApplicationCountOutputTypeCountUserInstallsArgs_schema();
export const ApplicationCountOutputTypeCountUserInstallsArgsObjectZodSchema =
  __makeSchema_ApplicationCountOutputTypeCountUserInstallsArgs_schema();

// File: UserSelect.schema.ts
const __makeSchema_UserSelect_schema = () =>
  z
    .object({
      id: z.boolean().optional(),
      email: z.boolean().optional(),
      password: z.boolean().optional(),
      name: z.boolean().optional(),
      oauthProviders: z.boolean().optional(),
      resetPasswordToken: z.boolean().optional(),
      resetPasswordExpires: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      applications: z.union([z.boolean(), z.lazy(() => ApplicationFindManySchema)]).optional(),
      installs: z.union([z.boolean(), z.lazy(() => UserApplicationFindManySchema)]).optional(),
      apiKeys: z.union([z.boolean(), z.lazy(() => ApiKeyFindManySchema)]).optional(),
      settings: z.union([z.boolean(), z.lazy(() => SettingsArgsObjectSchema)]).optional(),
      dialogs: z.union([z.boolean(), z.lazy(() => DialogFindManySchema)]).optional(),
      _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional(),
    })
    .strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> =
  __makeSchema_UserSelect_schema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = __makeSchema_UserSelect_schema();

// File: ApplicationSelect.schema.ts
const __makeSchema_ApplicationSelect_schema = () =>
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      name: z.boolean().optional(),
      version: z.boolean().optional(),
      type: z.boolean().optional(),
      description: z.boolean().optional(),
      status: z.boolean().optional(),
      isPublished: z.boolean().optional(),
      ownerId: z.boolean().optional(),
      owner: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
      entryPoints: z.boolean().optional(),
      permissions: z.boolean().optional(),
      storage: z.boolean().optional(),
      manifest: z.boolean().optional(),
      icon: z.boolean().optional(),
      versions: z.union([z.boolean(), z.lazy(() => ApplicationVersionFindManySchema)]).optional(),
      userInstalls: z.union([z.boolean(), z.lazy(() => UserApplicationFindManySchema)]).optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      _count: z
        .union([z.boolean(), z.lazy(() => ApplicationCountOutputTypeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const ApplicationSelectObjectSchema: z.ZodType<Prisma.ApplicationSelect> =
  __makeSchema_ApplicationSelect_schema() as unknown as z.ZodType<Prisma.ApplicationSelect>;
export const ApplicationSelectObjectZodSchema = __makeSchema_ApplicationSelect_schema();

// File: ApplicationVersionSelect.schema.ts
const __makeSchema_ApplicationVersionSelect_schema = () =>
  z
    .object({
      id: z.boolean().optional(),
      applicationId: z.boolean().optional(),
      application: z.union([z.boolean(), z.lazy(() => ApplicationArgsObjectSchema)]).optional(),
      version: z.boolean().optional(),
      status: z.boolean().optional(),
      releaseNotes: z.boolean().optional(),
      description: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      entryPoints: z.boolean().optional(),
      permissions: z.boolean().optional(),
      storage: z.boolean().optional(),
      manifest: z.boolean().optional(),
    })
    .strict();
export const ApplicationVersionSelectObjectSchema: z.ZodType<Prisma.ApplicationVersionSelect> =
  __makeSchema_ApplicationVersionSelect_schema() as unknown as z.ZodType<Prisma.ApplicationVersionSelect>;
export const ApplicationVersionSelectObjectZodSchema =
  __makeSchema_ApplicationVersionSelect_schema();

// File: UserApplicationSelect.schema.ts
const __makeSchema_UserApplicationSelect_schema = () =>
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      applicationId: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
      application: z.union([z.boolean(), z.lazy(() => ApplicationArgsObjectSchema)]).optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict();
export const UserApplicationSelectObjectSchema: z.ZodType<Prisma.UserApplicationSelect> =
  __makeSchema_UserApplicationSelect_schema() as unknown as z.ZodType<Prisma.UserApplicationSelect>;
export const UserApplicationSelectObjectZodSchema = __makeSchema_UserApplicationSelect_schema();

// File: ApiKeySelect.schema.ts
const __makeSchema_ApiKeySelect_schema = () =>
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
      provider: z.boolean().optional(),
      encryptedKey: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict();
export const ApiKeySelectObjectSchema: z.ZodType<Prisma.ApiKeySelect> =
  __makeSchema_ApiKeySelect_schema() as unknown as z.ZodType<Prisma.ApiKeySelect>;
export const ApiKeySelectObjectZodSchema = __makeSchema_ApiKeySelect_schema();

// File: SettingsSelect.schema.ts
const __makeSchema_SettingsSelect_schema = () =>
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
      volume: z.boolean().optional(),
      language: z.boolean().optional(),
      theme: z.boolean().optional(),
      accentColorLight: z.boolean().optional(),
      accentColorDark: z.boolean().optional(),
      sttProviderName: z.boolean().optional(),
      llmProviderName: z.boolean().optional(),
      llmModel: z.boolean().optional(),
      ttsProviderName: z.boolean().optional(),
      welcomeTitle: z.boolean().optional(),
      idleTimeoutSeconds: z.boolean().optional(),
      idleMode: z.boolean().optional(),
      idleCustomImagePath: z.boolean().optional(),
      idleRemoteEndpoint: z.boolean().optional(),
      modelScene: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict();
export const SettingsSelectObjectSchema: z.ZodType<Prisma.SettingsSelect> =
  __makeSchema_SettingsSelect_schema() as unknown as z.ZodType<Prisma.SettingsSelect>;
export const SettingsSelectObjectZodSchema = __makeSchema_SettingsSelect_schema();

// File: DialogSelect.schema.ts
const __makeSchema_DialogSelect_schema = () =>
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
      dialogId: z.boolean().optional(),
      title: z.boolean().optional(),
      messages: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict();
export const DialogSelectObjectSchema: z.ZodType<Prisma.DialogSelect> =
  __makeSchema_DialogSelect_schema() as unknown as z.ZodType<Prisma.DialogSelect>;
export const DialogSelectObjectZodSchema = __makeSchema_DialogSelect_schema();

// File: UserArgs.schema.ts
const __makeSchema_UserArgs_schema = () =>
  z
    .object({
      select: z.lazy(() => UserSelectObjectSchema).optional(),
      include: z.lazy(() => UserIncludeObjectSchema).optional(),
    })
    .strict();
export const UserArgsObjectSchema = __makeSchema_UserArgs_schema();
export const UserArgsObjectZodSchema = __makeSchema_UserArgs_schema();

// File: ApplicationArgs.schema.ts
const __makeSchema_ApplicationArgs_schema = () =>
  z
    .object({
      select: z.lazy(() => ApplicationSelectObjectSchema).optional(),
      include: z.lazy(() => ApplicationIncludeObjectSchema).optional(),
    })
    .strict();
export const ApplicationArgsObjectSchema = __makeSchema_ApplicationArgs_schema();
export const ApplicationArgsObjectZodSchema = __makeSchema_ApplicationArgs_schema();

// File: ApplicationVersionArgs.schema.ts
const __makeSchema_ApplicationVersionArgs_schema = () =>
  z
    .object({
      select: z.lazy(() => ApplicationVersionSelectObjectSchema).optional(),
      include: z.lazy(() => ApplicationVersionIncludeObjectSchema).optional(),
    })
    .strict();
export const ApplicationVersionArgsObjectSchema = __makeSchema_ApplicationVersionArgs_schema();
export const ApplicationVersionArgsObjectZodSchema = __makeSchema_ApplicationVersionArgs_schema();

// File: UserApplicationArgs.schema.ts
const __makeSchema_UserApplicationArgs_schema = () =>
  z
    .object({
      select: z.lazy(() => UserApplicationSelectObjectSchema).optional(),
      include: z.lazy(() => UserApplicationIncludeObjectSchema).optional(),
    })
    .strict();
export const UserApplicationArgsObjectSchema = __makeSchema_UserApplicationArgs_schema();
export const UserApplicationArgsObjectZodSchema = __makeSchema_UserApplicationArgs_schema();

// File: ApiKeyArgs.schema.ts
const __makeSchema_ApiKeyArgs_schema = () =>
  z
    .object({
      select: z.lazy(() => ApiKeySelectObjectSchema).optional(),
      include: z.lazy(() => ApiKeyIncludeObjectSchema).optional(),
    })
    .strict();
export const ApiKeyArgsObjectSchema = __makeSchema_ApiKeyArgs_schema();
export const ApiKeyArgsObjectZodSchema = __makeSchema_ApiKeyArgs_schema();

// File: SettingsArgs.schema.ts
const __makeSchema_SettingsArgs_schema = () =>
  z
    .object({
      select: z.lazy(() => SettingsSelectObjectSchema).optional(),
      include: z.lazy(() => SettingsIncludeObjectSchema).optional(),
    })
    .strict();
export const SettingsArgsObjectSchema = __makeSchema_SettingsArgs_schema();
export const SettingsArgsObjectZodSchema = __makeSchema_SettingsArgs_schema();

// File: DialogArgs.schema.ts
const __makeSchema_DialogArgs_schema = () =>
  z
    .object({
      select: z.lazy(() => DialogSelectObjectSchema).optional(),
      include: z.lazy(() => DialogIncludeObjectSchema).optional(),
    })
    .strict();
export const DialogArgsObjectSchema = __makeSchema_DialogArgs_schema();
export const DialogArgsObjectZodSchema = __makeSchema_DialogArgs_schema();

// File: UserInclude.schema.ts
const __makeSchema_UserInclude_schema = () =>
  z
    .object({
      applications: z.union([z.boolean(), z.lazy(() => ApplicationFindManySchema)]).optional(),
      installs: z.union([z.boolean(), z.lazy(() => UserApplicationFindManySchema)]).optional(),
      apiKeys: z.union([z.boolean(), z.lazy(() => ApiKeyFindManySchema)]).optional(),
      settings: z.union([z.boolean(), z.lazy(() => SettingsArgsObjectSchema)]).optional(),
      dialogs: z.union([z.boolean(), z.lazy(() => DialogFindManySchema)]).optional(),
      _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional(),
    })
    .strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> =
  __makeSchema_UserInclude_schema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = __makeSchema_UserInclude_schema();

// File: ApplicationInclude.schema.ts
const __makeSchema_ApplicationInclude_schema = () =>
  z
    .object({
      owner: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
      versions: z.union([z.boolean(), z.lazy(() => ApplicationVersionFindManySchema)]).optional(),
      userInstalls: z.union([z.boolean(), z.lazy(() => UserApplicationFindManySchema)]).optional(),
      _count: z
        .union([z.boolean(), z.lazy(() => ApplicationCountOutputTypeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const ApplicationIncludeObjectSchema: z.ZodType<Prisma.ApplicationInclude> =
  __makeSchema_ApplicationInclude_schema() as unknown as z.ZodType<Prisma.ApplicationInclude>;
export const ApplicationIncludeObjectZodSchema = __makeSchema_ApplicationInclude_schema();

// File: ApplicationVersionInclude.schema.ts
const __makeSchema_ApplicationVersionInclude_schema = () =>
  z
    .object({
      application: z.union([z.boolean(), z.lazy(() => ApplicationArgsObjectSchema)]).optional(),
    })
    .strict();
export const ApplicationVersionIncludeObjectSchema: z.ZodType<Prisma.ApplicationVersionInclude> =
  __makeSchema_ApplicationVersionInclude_schema() as unknown as z.ZodType<Prisma.ApplicationVersionInclude>;
export const ApplicationVersionIncludeObjectZodSchema =
  __makeSchema_ApplicationVersionInclude_schema();

// File: UserApplicationInclude.schema.ts
const __makeSchema_UserApplicationInclude_schema = () =>
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
      application: z.union([z.boolean(), z.lazy(() => ApplicationArgsObjectSchema)]).optional(),
    })
    .strict();
export const UserApplicationIncludeObjectSchema: z.ZodType<Prisma.UserApplicationInclude> =
  __makeSchema_UserApplicationInclude_schema() as unknown as z.ZodType<Prisma.UserApplicationInclude>;
export const UserApplicationIncludeObjectZodSchema = __makeSchema_UserApplicationInclude_schema();

// File: ApiKeyInclude.schema.ts
const __makeSchema_ApiKeyInclude_schema = () =>
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    })
    .strict();
export const ApiKeyIncludeObjectSchema: z.ZodType<Prisma.ApiKeyInclude> =
  __makeSchema_ApiKeyInclude_schema() as unknown as z.ZodType<Prisma.ApiKeyInclude>;
export const ApiKeyIncludeObjectZodSchema = __makeSchema_ApiKeyInclude_schema();

// File: SettingsInclude.schema.ts
const __makeSchema_SettingsInclude_schema = () =>
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    })
    .strict();
export const SettingsIncludeObjectSchema: z.ZodType<Prisma.SettingsInclude> =
  __makeSchema_SettingsInclude_schema() as unknown as z.ZodType<Prisma.SettingsInclude>;
export const SettingsIncludeObjectZodSchema = __makeSchema_SettingsInclude_schema();

// File: DialogInclude.schema.ts
const __makeSchema_DialogInclude_schema = () =>
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    })
    .strict();
export const DialogIncludeObjectSchema: z.ZodType<Prisma.DialogInclude> =
  __makeSchema_DialogInclude_schema() as unknown as z.ZodType<Prisma.DialogInclude>;
export const DialogIncludeObjectZodSchema = __makeSchema_DialogInclude_schema();

// File: findUniqueUser.schema.ts

export const UserFindUniqueSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    where: UserWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.UserFindUniqueArgs>;

export const UserFindUniqueZodSchema = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    where: UserWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findUniqueOrThrowUser.schema.ts

export const UserFindUniqueOrThrowSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    where: UserWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.UserFindUniqueOrThrowArgs>;

export const UserFindUniqueOrThrowZodSchema = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    where: UserWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findFirstUser.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserFindFirstSelectSchema__findFirstUser_schema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    name: z.boolean().optional(),
    oauthProviders: z.boolean().optional(),
    resetPasswordToken: z.boolean().optional(),
    resetPasswordExpires: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    applications: z.boolean().optional(),
    installs: z.boolean().optional(),
    apiKeys: z.boolean().optional(),
    settings: z.boolean().optional(),
    dialogs: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserSelect>;

export const UserFindFirstSelectZodSchema__findFirstUser_schema = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    name: z.boolean().optional(),
    oauthProviders: z.boolean().optional(),
    resetPasswordToken: z.boolean().optional(),
    resetPasswordExpires: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    applications: z.boolean().optional(),
    installs: z.boolean().optional(),
    apiKeys: z.boolean().optional(),
    settings: z.boolean().optional(),
    dialogs: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const UserFindFirstSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserFindFirstSelectSchema__findFirstUser_schema.optional(),
    include: z.lazy(() => UserIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstZodSchema = z
  .object({
    select: UserFindFirstSelectSchema__findFirstUser_schema.optional(),
    include: z.lazy(() => UserIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

// File: findFirstOrThrowUser.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserFindFirstOrThrowSelectSchema__findFirstOrThrowUser_schema: z.ZodType<Prisma.UserSelect> =
  z
    .object({
      id: z.boolean().optional(),
      email: z.boolean().optional(),
      password: z.boolean().optional(),
      name: z.boolean().optional(),
      oauthProviders: z.boolean().optional(),
      resetPasswordToken: z.boolean().optional(),
      resetPasswordExpires: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      applications: z.boolean().optional(),
      installs: z.boolean().optional(),
      apiKeys: z.boolean().optional(),
      settings: z.boolean().optional(),
      dialogs: z.boolean().optional(),
      _count: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserSelect>;

export const UserFindFirstOrThrowSelectZodSchema__findFirstOrThrowUser_schema = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    name: z.boolean().optional(),
    oauthProviders: z.boolean().optional(),
    resetPasswordToken: z.boolean().optional(),
    resetPasswordExpires: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    applications: z.boolean().optional(),
    installs: z.boolean().optional(),
    apiKeys: z.boolean().optional(),
    settings: z.boolean().optional(),
    dialogs: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const UserFindFirstOrThrowSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z
  .object({
    select: UserFindFirstOrThrowSelectSchema__findFirstOrThrowUser_schema.optional(),
    include: z.lazy(() => UserIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserFindFirstOrThrowArgs>;

export const UserFindFirstOrThrowZodSchema = z
  .object({
    select: UserFindFirstOrThrowSelectSchema__findFirstOrThrowUser_schema.optional(),
    include: z.lazy(() => UserIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

// File: findManyUser.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserFindManySelectSchema__findManyUser_schema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    name: z.boolean().optional(),
    oauthProviders: z.boolean().optional(),
    resetPasswordToken: z.boolean().optional(),
    resetPasswordExpires: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    applications: z.boolean().optional(),
    installs: z.boolean().optional(),
    apiKeys: z.boolean().optional(),
    settings: z.boolean().optional(),
    dialogs: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserSelect>;

export const UserFindManySelectZodSchema__findManyUser_schema = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    name: z.boolean().optional(),
    oauthProviders: z.boolean().optional(),
    resetPasswordToken: z.boolean().optional(),
    resetPasswordExpires: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    applications: z.boolean().optional(),
    installs: z.boolean().optional(),
    apiKeys: z.boolean().optional(),
    settings: z.boolean().optional(),
    dialogs: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const UserFindManySchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserFindManySelectSchema__findManyUser_schema.optional(),
    include: z.lazy(() => UserIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserFindManyArgs>;

export const UserFindManyZodSchema = z
  .object({
    select: UserFindManySelectSchema__findManyUser_schema.optional(),
    include: z.lazy(() => UserIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

// File: countUser.schema.ts

export const UserCountSchema: z.ZodType<Prisma.UserCountArgs> = z
  .object({
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), UserCountAggregateInputObjectSchema]).optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserCountArgs>;

export const UserCountZodSchema = z
  .object({
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), UserCountAggregateInputObjectSchema]).optional(),
  })
  .strict();

// File: createOneUser.schema.ts

export const UserCreateOneSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    data: z.union([UserCreateInputObjectSchema, UserUncheckedCreateInputObjectSchema]),
  })
  .strict() as unknown as z.ZodType<Prisma.UserCreateArgs>;

export const UserCreateOneZodSchema = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    data: z.union([UserCreateInputObjectSchema, UserUncheckedCreateInputObjectSchema]),
  })
  .strict();

// File: createManyUser.schema.ts

export const UserCreateManySchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([UserCreateManyInputObjectSchema, z.array(UserCreateManyInputObjectSchema)]),
  })
  .strict() as unknown as z.ZodType<Prisma.UserCreateManyArgs>;

export const UserCreateManyZodSchema = z
  .object({
    data: z.union([UserCreateManyInputObjectSchema, z.array(UserCreateManyInputObjectSchema)]),
  })
  .strict();

// File: deleteOneUser.schema.ts

export const UserDeleteOneSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    where: UserWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.UserDeleteArgs>;

export const UserDeleteOneZodSchema = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    where: UserWhereUniqueInputObjectSchema,
  })
  .strict();

// File: deleteManyUser.schema.ts

export const UserDeleteManySchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({ where: UserWhereInputObjectSchema.optional() })
  .strict() as unknown as z.ZodType<Prisma.UserDeleteManyArgs>;

export const UserDeleteManyZodSchema = z
  .object({ where: UserWhereInputObjectSchema.optional() })
  .strict();

// File: updateOneUser.schema.ts

export const UserUpdateOneSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    data: z.union([UserUpdateInputObjectSchema, UserUncheckedUpdateInputObjectSchema]),
    where: UserWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.UserUpdateArgs>;

export const UserUpdateOneZodSchema = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    data: z.union([UserUpdateInputObjectSchema, UserUncheckedUpdateInputObjectSchema]),
    where: UserWhereUniqueInputObjectSchema,
  })
  .strict();

// File: updateManyUser.schema.ts

export const UserUpdateManySchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: UserUpdateManyMutationInputObjectSchema,
    where: UserWhereInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserUpdateManyArgs>;

export const UserUpdateManyZodSchema = z
  .object({
    data: UserUpdateManyMutationInputObjectSchema,
    where: UserWhereInputObjectSchema.optional(),
  })
  .strict();

// File: upsertOneUser.schema.ts

export const UserUpsertOneSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    where: UserWhereUniqueInputObjectSchema,
    create: z.union([UserCreateInputObjectSchema, UserUncheckedCreateInputObjectSchema]),
    update: z.union([UserUpdateInputObjectSchema, UserUncheckedUpdateInputObjectSchema]),
  })
  .strict() as unknown as z.ZodType<Prisma.UserUpsertArgs>;

export const UserUpsertOneZodSchema = z
  .object({
    select: UserSelectObjectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    where: UserWhereUniqueInputObjectSchema,
    create: z.union([UserCreateInputObjectSchema, UserUncheckedCreateInputObjectSchema]),
    update: z.union([UserUpdateInputObjectSchema, UserUncheckedUpdateInputObjectSchema]),
  })
  .strict();

// File: aggregateUser.schema.ts

export const UserAggregateSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), UserCountAggregateInputObjectSchema]).optional(),
    _min: UserMinAggregateInputObjectSchema.optional(),
    _max: UserMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserAggregateArgs>;

export const UserAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), UserCountAggregateInputObjectSchema]).optional(),
    _min: UserMinAggregateInputObjectSchema.optional(),
    _max: UserMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: groupByUser.schema.ts

export const UserGroupBySchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputObjectSchema,
        UserOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: UserScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(UserScalarFieldEnumSchema),
    _count: z.union([z.literal(true), UserCountAggregateInputObjectSchema]).optional(),
    _min: UserMinAggregateInputObjectSchema.optional(),
    _max: UserMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserGroupByArgs>;

export const UserGroupByZodSchema = z
  .object({
    where: UserWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputObjectSchema,
        UserOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: UserScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(UserScalarFieldEnumSchema),
    _count: z.union([z.literal(true), UserCountAggregateInputObjectSchema]).optional(),
    _min: UserMinAggregateInputObjectSchema.optional(),
    _max: UserMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: findUniqueApplication.schema.ts

export const ApplicationFindUniqueSchema: z.ZodType<Prisma.ApplicationFindUniqueArgs> = z
  .object({
    select: ApplicationSelectObjectSchema.optional(),
    include: ApplicationIncludeObjectSchema.optional(),
    where: ApplicationWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationFindUniqueArgs>;

export const ApplicationFindUniqueZodSchema = z
  .object({
    select: ApplicationSelectObjectSchema.optional(),
    include: ApplicationIncludeObjectSchema.optional(),
    where: ApplicationWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findUniqueOrThrowApplication.schema.ts

export const ApplicationFindUniqueOrThrowSchema: z.ZodType<Prisma.ApplicationFindUniqueOrThrowArgs> =
  z
    .object({
      select: ApplicationSelectObjectSchema.optional(),
      include: ApplicationIncludeObjectSchema.optional(),
      where: ApplicationWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationFindUniqueOrThrowArgs>;

export const ApplicationFindUniqueOrThrowZodSchema = z
  .object({
    select: ApplicationSelectObjectSchema.optional(),
    include: ApplicationIncludeObjectSchema.optional(),
    where: ApplicationWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findFirstApplication.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApplicationFindFirstSelectSchema__findFirstApplication_schema: z.ZodType<Prisma.ApplicationSelect> =
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      name: z.boolean().optional(),
      version: z.boolean().optional(),
      type: z.boolean().optional(),
      description: z.boolean().optional(),
      status: z.boolean().optional(),
      isPublished: z.boolean().optional(),
      ownerId: z.boolean().optional(),
      owner: z.boolean().optional(),
      entryPoints: z.boolean().optional(),
      permissions: z.boolean().optional(),
      storage: z.boolean().optional(),
      manifest: z.boolean().optional(),
      icon: z.boolean().optional(),
      versions: z.boolean().optional(),
      userInstalls: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      _count: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationSelect>;

export const ApplicationFindFirstSelectZodSchema__findFirstApplication_schema = z
  .object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    name: z.boolean().optional(),
    version: z.boolean().optional(),
    type: z.boolean().optional(),
    description: z.boolean().optional(),
    status: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    ownerId: z.boolean().optional(),
    owner: z.boolean().optional(),
    entryPoints: z.boolean().optional(),
    permissions: z.boolean().optional(),
    storage: z.boolean().optional(),
    manifest: z.boolean().optional(),
    icon: z.boolean().optional(),
    versions: z.boolean().optional(),
    userInstalls: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const ApplicationFindFirstSchema: z.ZodType<Prisma.ApplicationFindFirstArgs> = z
  .object({
    select: ApplicationFindFirstSelectSchema__findFirstApplication_schema.optional(),
    include: z.lazy(() => ApplicationIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApplicationOrderByWithRelationInputObjectSchema,
        ApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationWhereInputObjectSchema.optional(),
    cursor: ApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ApplicationScalarFieldEnumSchema, ApplicationScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationFindFirstArgs>;

export const ApplicationFindFirstZodSchema = z
  .object({
    select: ApplicationFindFirstSelectSchema__findFirstApplication_schema.optional(),
    include: z.lazy(() => ApplicationIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApplicationOrderByWithRelationInputObjectSchema,
        ApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationWhereInputObjectSchema.optional(),
    cursor: ApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ApplicationScalarFieldEnumSchema, ApplicationScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: findFirstOrThrowApplication.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApplicationFindFirstOrThrowSelectSchema__findFirstOrThrowApplication_schema: z.ZodType<Prisma.ApplicationSelect> =
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      name: z.boolean().optional(),
      version: z.boolean().optional(),
      type: z.boolean().optional(),
      description: z.boolean().optional(),
      status: z.boolean().optional(),
      isPublished: z.boolean().optional(),
      ownerId: z.boolean().optional(),
      owner: z.boolean().optional(),
      entryPoints: z.boolean().optional(),
      permissions: z.boolean().optional(),
      storage: z.boolean().optional(),
      manifest: z.boolean().optional(),
      icon: z.boolean().optional(),
      versions: z.boolean().optional(),
      userInstalls: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      _count: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationSelect>;

export const ApplicationFindFirstOrThrowSelectZodSchema__findFirstOrThrowApplication_schema = z
  .object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    name: z.boolean().optional(),
    version: z.boolean().optional(),
    type: z.boolean().optional(),
    description: z.boolean().optional(),
    status: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    ownerId: z.boolean().optional(),
    owner: z.boolean().optional(),
    entryPoints: z.boolean().optional(),
    permissions: z.boolean().optional(),
    storage: z.boolean().optional(),
    manifest: z.boolean().optional(),
    icon: z.boolean().optional(),
    versions: z.boolean().optional(),
    userInstalls: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const ApplicationFindFirstOrThrowSchema: z.ZodType<Prisma.ApplicationFindFirstOrThrowArgs> =
  z
    .object({
      select:
        ApplicationFindFirstOrThrowSelectSchema__findFirstOrThrowApplication_schema.optional(),
      include: z.lazy(() => ApplicationIncludeObjectSchema.optional()),
      orderBy: z
        .union([
          ApplicationOrderByWithRelationInputObjectSchema,
          ApplicationOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: ApplicationWhereInputObjectSchema.optional(),
      cursor: ApplicationWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([ApplicationScalarFieldEnumSchema, ApplicationScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationFindFirstOrThrowArgs>;

export const ApplicationFindFirstOrThrowZodSchema = z
  .object({
    select: ApplicationFindFirstOrThrowSelectSchema__findFirstOrThrowApplication_schema.optional(),
    include: z.lazy(() => ApplicationIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApplicationOrderByWithRelationInputObjectSchema,
        ApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationWhereInputObjectSchema.optional(),
    cursor: ApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ApplicationScalarFieldEnumSchema, ApplicationScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: findManyApplication.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApplicationFindManySelectSchema__findManyApplication_schema: z.ZodType<Prisma.ApplicationSelect> =
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      name: z.boolean().optional(),
      version: z.boolean().optional(),
      type: z.boolean().optional(),
      description: z.boolean().optional(),
      status: z.boolean().optional(),
      isPublished: z.boolean().optional(),
      ownerId: z.boolean().optional(),
      owner: z.boolean().optional(),
      entryPoints: z.boolean().optional(),
      permissions: z.boolean().optional(),
      storage: z.boolean().optional(),
      manifest: z.boolean().optional(),
      icon: z.boolean().optional(),
      versions: z.boolean().optional(),
      userInstalls: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      _count: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationSelect>;

export const ApplicationFindManySelectZodSchema__findManyApplication_schema = z
  .object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    name: z.boolean().optional(),
    version: z.boolean().optional(),
    type: z.boolean().optional(),
    description: z.boolean().optional(),
    status: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    ownerId: z.boolean().optional(),
    owner: z.boolean().optional(),
    entryPoints: z.boolean().optional(),
    permissions: z.boolean().optional(),
    storage: z.boolean().optional(),
    manifest: z.boolean().optional(),
    icon: z.boolean().optional(),
    versions: z.boolean().optional(),
    userInstalls: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const ApplicationFindManySchema: z.ZodType<Prisma.ApplicationFindManyArgs> = z
  .object({
    select: ApplicationFindManySelectSchema__findManyApplication_schema.optional(),
    include: z.lazy(() => ApplicationIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApplicationOrderByWithRelationInputObjectSchema,
        ApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationWhereInputObjectSchema.optional(),
    cursor: ApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ApplicationScalarFieldEnumSchema, ApplicationScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationFindManyArgs>;

export const ApplicationFindManyZodSchema = z
  .object({
    select: ApplicationFindManySelectSchema__findManyApplication_schema.optional(),
    include: z.lazy(() => ApplicationIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApplicationOrderByWithRelationInputObjectSchema,
        ApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationWhereInputObjectSchema.optional(),
    cursor: ApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ApplicationScalarFieldEnumSchema, ApplicationScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: countApplication.schema.ts

export const ApplicationCountSchema: z.ZodType<Prisma.ApplicationCountArgs> = z
  .object({
    orderBy: z
      .union([
        ApplicationOrderByWithRelationInputObjectSchema,
        ApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationWhereInputObjectSchema.optional(),
    cursor: ApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), ApplicationCountAggregateInputObjectSchema]).optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationCountArgs>;

export const ApplicationCountZodSchema = z
  .object({
    orderBy: z
      .union([
        ApplicationOrderByWithRelationInputObjectSchema,
        ApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationWhereInputObjectSchema.optional(),
    cursor: ApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), ApplicationCountAggregateInputObjectSchema]).optional(),
  })
  .strict();

// File: createOneApplication.schema.ts

export const ApplicationCreateOneSchema: z.ZodType<Prisma.ApplicationCreateArgs> = z
  .object({
    select: ApplicationSelectObjectSchema.optional(),
    include: ApplicationIncludeObjectSchema.optional(),
    data: z.union([
      ApplicationCreateInputObjectSchema,
      ApplicationUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationCreateArgs>;

export const ApplicationCreateOneZodSchema = z
  .object({
    select: ApplicationSelectObjectSchema.optional(),
    include: ApplicationIncludeObjectSchema.optional(),
    data: z.union([
      ApplicationCreateInputObjectSchema,
      ApplicationUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();

// File: createManyApplication.schema.ts

export const ApplicationCreateManySchema: z.ZodType<Prisma.ApplicationCreateManyArgs> = z
  .object({
    data: z.union([
      ApplicationCreateManyInputObjectSchema,
      z.array(ApplicationCreateManyInputObjectSchema),
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationCreateManyArgs>;

export const ApplicationCreateManyZodSchema = z
  .object({
    data: z.union([
      ApplicationCreateManyInputObjectSchema,
      z.array(ApplicationCreateManyInputObjectSchema),
    ]),
  })
  .strict();

// File: deleteOneApplication.schema.ts

export const ApplicationDeleteOneSchema: z.ZodType<Prisma.ApplicationDeleteArgs> = z
  .object({
    select: ApplicationSelectObjectSchema.optional(),
    include: ApplicationIncludeObjectSchema.optional(),
    where: ApplicationWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationDeleteArgs>;

export const ApplicationDeleteOneZodSchema = z
  .object({
    select: ApplicationSelectObjectSchema.optional(),
    include: ApplicationIncludeObjectSchema.optional(),
    where: ApplicationWhereUniqueInputObjectSchema,
  })
  .strict();

// File: deleteManyApplication.schema.ts

export const ApplicationDeleteManySchema: z.ZodType<Prisma.ApplicationDeleteManyArgs> = z
  .object({ where: ApplicationWhereInputObjectSchema.optional() })
  .strict() as unknown as z.ZodType<Prisma.ApplicationDeleteManyArgs>;

export const ApplicationDeleteManyZodSchema = z
  .object({ where: ApplicationWhereInputObjectSchema.optional() })
  .strict();

// File: updateOneApplication.schema.ts

export const ApplicationUpdateOneSchema: z.ZodType<Prisma.ApplicationUpdateArgs> = z
  .object({
    select: ApplicationSelectObjectSchema.optional(),
    include: ApplicationIncludeObjectSchema.optional(),
    data: z.union([
      ApplicationUpdateInputObjectSchema,
      ApplicationUncheckedUpdateInputObjectSchema,
    ]),
    where: ApplicationWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationUpdateArgs>;

export const ApplicationUpdateOneZodSchema = z
  .object({
    select: ApplicationSelectObjectSchema.optional(),
    include: ApplicationIncludeObjectSchema.optional(),
    data: z.union([
      ApplicationUpdateInputObjectSchema,
      ApplicationUncheckedUpdateInputObjectSchema,
    ]),
    where: ApplicationWhereUniqueInputObjectSchema,
  })
  .strict();

// File: updateManyApplication.schema.ts

export const ApplicationUpdateManySchema: z.ZodType<Prisma.ApplicationUpdateManyArgs> = z
  .object({
    data: ApplicationUpdateManyMutationInputObjectSchema,
    where: ApplicationWhereInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationUpdateManyArgs>;

export const ApplicationUpdateManyZodSchema = z
  .object({
    data: ApplicationUpdateManyMutationInputObjectSchema,
    where: ApplicationWhereInputObjectSchema.optional(),
  })
  .strict();

// File: upsertOneApplication.schema.ts

export const ApplicationUpsertOneSchema: z.ZodType<Prisma.ApplicationUpsertArgs> = z
  .object({
    select: ApplicationSelectObjectSchema.optional(),
    include: ApplicationIncludeObjectSchema.optional(),
    where: ApplicationWhereUniqueInputObjectSchema,
    create: z.union([
      ApplicationCreateInputObjectSchema,
      ApplicationUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      ApplicationUpdateInputObjectSchema,
      ApplicationUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationUpsertArgs>;

export const ApplicationUpsertOneZodSchema = z
  .object({
    select: ApplicationSelectObjectSchema.optional(),
    include: ApplicationIncludeObjectSchema.optional(),
    where: ApplicationWhereUniqueInputObjectSchema,
    create: z.union([
      ApplicationCreateInputObjectSchema,
      ApplicationUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      ApplicationUpdateInputObjectSchema,
      ApplicationUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();

// File: aggregateApplication.schema.ts

export const ApplicationAggregateSchema: z.ZodType<Prisma.ApplicationAggregateArgs> = z
  .object({
    orderBy: z
      .union([
        ApplicationOrderByWithRelationInputObjectSchema,
        ApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationWhereInputObjectSchema.optional(),
    cursor: ApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), ApplicationCountAggregateInputObjectSchema]).optional(),
    _min: ApplicationMinAggregateInputObjectSchema.optional(),
    _max: ApplicationMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationAggregateArgs>;

export const ApplicationAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        ApplicationOrderByWithRelationInputObjectSchema,
        ApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationWhereInputObjectSchema.optional(),
    cursor: ApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), ApplicationCountAggregateInputObjectSchema]).optional(),
    _min: ApplicationMinAggregateInputObjectSchema.optional(),
    _max: ApplicationMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: groupByApplication.schema.ts

export const ApplicationGroupBySchema: z.ZodType<Prisma.ApplicationGroupByArgs> = z
  .object({
    where: ApplicationWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        ApplicationOrderByWithAggregationInputObjectSchema,
        ApplicationOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: ApplicationScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(ApplicationScalarFieldEnumSchema),
    _count: z.union([z.literal(true), ApplicationCountAggregateInputObjectSchema]).optional(),
    _min: ApplicationMinAggregateInputObjectSchema.optional(),
    _max: ApplicationMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationGroupByArgs>;

export const ApplicationGroupByZodSchema = z
  .object({
    where: ApplicationWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        ApplicationOrderByWithAggregationInputObjectSchema,
        ApplicationOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: ApplicationScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(ApplicationScalarFieldEnumSchema),
    _count: z.union([z.literal(true), ApplicationCountAggregateInputObjectSchema]).optional(),
    _min: ApplicationMinAggregateInputObjectSchema.optional(),
    _max: ApplicationMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: findUniqueApplicationVersion.schema.ts

export const ApplicationVersionFindUniqueSchema: z.ZodType<Prisma.ApplicationVersionFindUniqueArgs> =
  z
    .object({
      select: ApplicationVersionSelectObjectSchema.optional(),
      include: ApplicationVersionIncludeObjectSchema.optional(),
      where: ApplicationVersionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationVersionFindUniqueArgs>;

export const ApplicationVersionFindUniqueZodSchema = z
  .object({
    select: ApplicationVersionSelectObjectSchema.optional(),
    include: ApplicationVersionIncludeObjectSchema.optional(),
    where: ApplicationVersionWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findUniqueOrThrowApplicationVersion.schema.ts

export const ApplicationVersionFindUniqueOrThrowSchema: z.ZodType<Prisma.ApplicationVersionFindUniqueOrThrowArgs> =
  z
    .object({
      select: ApplicationVersionSelectObjectSchema.optional(),
      include: ApplicationVersionIncludeObjectSchema.optional(),
      where: ApplicationVersionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationVersionFindUniqueOrThrowArgs>;

export const ApplicationVersionFindUniqueOrThrowZodSchema = z
  .object({
    select: ApplicationVersionSelectObjectSchema.optional(),
    include: ApplicationVersionIncludeObjectSchema.optional(),
    where: ApplicationVersionWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findFirstApplicationVersion.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApplicationVersionFindFirstSelectSchema__findFirstApplicationVersion_schema: z.ZodType<Prisma.ApplicationVersionSelect> =
  z
    .object({
      id: z.boolean().optional(),
      applicationId: z.boolean().optional(),
      application: z.boolean().optional(),
      version: z.boolean().optional(),
      status: z.boolean().optional(),
      releaseNotes: z.boolean().optional(),
      description: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      entryPoints: z.boolean().optional(),
      permissions: z.boolean().optional(),
      storage: z.boolean().optional(),
      manifest: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationVersionSelect>;

export const ApplicationVersionFindFirstSelectZodSchema__findFirstApplicationVersion_schema = z
  .object({
    id: z.boolean().optional(),
    applicationId: z.boolean().optional(),
    application: z.boolean().optional(),
    version: z.boolean().optional(),
    status: z.boolean().optional(),
    releaseNotes: z.boolean().optional(),
    description: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    entryPoints: z.boolean().optional(),
    permissions: z.boolean().optional(),
    storage: z.boolean().optional(),
    manifest: z.boolean().optional(),
  })
  .strict();

export const ApplicationVersionFindFirstSchema: z.ZodType<Prisma.ApplicationVersionFindFirstArgs> =
  z
    .object({
      select:
        ApplicationVersionFindFirstSelectSchema__findFirstApplicationVersion_schema.optional(),
      include: z.lazy(() => ApplicationVersionIncludeObjectSchema.optional()),
      orderBy: z
        .union([
          ApplicationVersionOrderByWithRelationInputObjectSchema,
          ApplicationVersionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: ApplicationVersionWhereInputObjectSchema.optional(),
      cursor: ApplicationVersionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ApplicationVersionScalarFieldEnumSchema,
          ApplicationVersionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationVersionFindFirstArgs>;

export const ApplicationVersionFindFirstZodSchema = z
  .object({
    select: ApplicationVersionFindFirstSelectSchema__findFirstApplicationVersion_schema.optional(),
    include: z.lazy(() => ApplicationVersionIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApplicationVersionOrderByWithRelationInputObjectSchema,
        ApplicationVersionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationVersionWhereInputObjectSchema.optional(),
    cursor: ApplicationVersionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ApplicationVersionScalarFieldEnumSchema,
        ApplicationVersionScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

// File: findFirstOrThrowApplicationVersion.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApplicationVersionFindFirstOrThrowSelectSchema__findFirstOrThrowApplicationVersion_schema: z.ZodType<Prisma.ApplicationVersionSelect> =
  z
    .object({
      id: z.boolean().optional(),
      applicationId: z.boolean().optional(),
      application: z.boolean().optional(),
      version: z.boolean().optional(),
      status: z.boolean().optional(),
      releaseNotes: z.boolean().optional(),
      description: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      entryPoints: z.boolean().optional(),
      permissions: z.boolean().optional(),
      storage: z.boolean().optional(),
      manifest: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationVersionSelect>;

export const ApplicationVersionFindFirstOrThrowSelectZodSchema__findFirstOrThrowApplicationVersion_schema =
  z
    .object({
      id: z.boolean().optional(),
      applicationId: z.boolean().optional(),
      application: z.boolean().optional(),
      version: z.boolean().optional(),
      status: z.boolean().optional(),
      releaseNotes: z.boolean().optional(),
      description: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      entryPoints: z.boolean().optional(),
      permissions: z.boolean().optional(),
      storage: z.boolean().optional(),
      manifest: z.boolean().optional(),
    })
    .strict();

export const ApplicationVersionFindFirstOrThrowSchema: z.ZodType<Prisma.ApplicationVersionFindFirstOrThrowArgs> =
  z
    .object({
      select:
        ApplicationVersionFindFirstOrThrowSelectSchema__findFirstOrThrowApplicationVersion_schema.optional(),
      include: z.lazy(() => ApplicationVersionIncludeObjectSchema.optional()),
      orderBy: z
        .union([
          ApplicationVersionOrderByWithRelationInputObjectSchema,
          ApplicationVersionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: ApplicationVersionWhereInputObjectSchema.optional(),
      cursor: ApplicationVersionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ApplicationVersionScalarFieldEnumSchema,
          ApplicationVersionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationVersionFindFirstOrThrowArgs>;

export const ApplicationVersionFindFirstOrThrowZodSchema = z
  .object({
    select:
      ApplicationVersionFindFirstOrThrowSelectSchema__findFirstOrThrowApplicationVersion_schema.optional(),
    include: z.lazy(() => ApplicationVersionIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApplicationVersionOrderByWithRelationInputObjectSchema,
        ApplicationVersionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationVersionWhereInputObjectSchema.optional(),
    cursor: ApplicationVersionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ApplicationVersionScalarFieldEnumSchema,
        ApplicationVersionScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

// File: findManyApplicationVersion.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApplicationVersionFindManySelectSchema__findManyApplicationVersion_schema: z.ZodType<Prisma.ApplicationVersionSelect> =
  z
    .object({
      id: z.boolean().optional(),
      applicationId: z.boolean().optional(),
      application: z.boolean().optional(),
      version: z.boolean().optional(),
      status: z.boolean().optional(),
      releaseNotes: z.boolean().optional(),
      description: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      entryPoints: z.boolean().optional(),
      permissions: z.boolean().optional(),
      storage: z.boolean().optional(),
      manifest: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationVersionSelect>;

export const ApplicationVersionFindManySelectZodSchema__findManyApplicationVersion_schema = z
  .object({
    id: z.boolean().optional(),
    applicationId: z.boolean().optional(),
    application: z.boolean().optional(),
    version: z.boolean().optional(),
    status: z.boolean().optional(),
    releaseNotes: z.boolean().optional(),
    description: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    entryPoints: z.boolean().optional(),
    permissions: z.boolean().optional(),
    storage: z.boolean().optional(),
    manifest: z.boolean().optional(),
  })
  .strict();

export const ApplicationVersionFindManySchema: z.ZodType<Prisma.ApplicationVersionFindManyArgs> = z
  .object({
    select: ApplicationVersionFindManySelectSchema__findManyApplicationVersion_schema.optional(),
    include: z.lazy(() => ApplicationVersionIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApplicationVersionOrderByWithRelationInputObjectSchema,
        ApplicationVersionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationVersionWhereInputObjectSchema.optional(),
    cursor: ApplicationVersionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ApplicationVersionScalarFieldEnumSchema,
        ApplicationVersionScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationVersionFindManyArgs>;

export const ApplicationVersionFindManyZodSchema = z
  .object({
    select: ApplicationVersionFindManySelectSchema__findManyApplicationVersion_schema.optional(),
    include: z.lazy(() => ApplicationVersionIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApplicationVersionOrderByWithRelationInputObjectSchema,
        ApplicationVersionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationVersionWhereInputObjectSchema.optional(),
    cursor: ApplicationVersionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ApplicationVersionScalarFieldEnumSchema,
        ApplicationVersionScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();

// File: countApplicationVersion.schema.ts

export const ApplicationVersionCountSchema: z.ZodType<Prisma.ApplicationVersionCountArgs> = z
  .object({
    orderBy: z
      .union([
        ApplicationVersionOrderByWithRelationInputObjectSchema,
        ApplicationVersionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationVersionWhereInputObjectSchema.optional(),
    cursor: ApplicationVersionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), ApplicationVersionCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationVersionCountArgs>;

export const ApplicationVersionCountZodSchema = z
  .object({
    orderBy: z
      .union([
        ApplicationVersionOrderByWithRelationInputObjectSchema,
        ApplicationVersionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationVersionWhereInputObjectSchema.optional(),
    cursor: ApplicationVersionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), ApplicationVersionCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();

// File: createOneApplicationVersion.schema.ts

export const ApplicationVersionCreateOneSchema: z.ZodType<Prisma.ApplicationVersionCreateArgs> = z
  .object({
    select: ApplicationVersionSelectObjectSchema.optional(),
    include: ApplicationVersionIncludeObjectSchema.optional(),
    data: z.union([
      ApplicationVersionCreateInputObjectSchema,
      ApplicationVersionUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationVersionCreateArgs>;

export const ApplicationVersionCreateOneZodSchema = z
  .object({
    select: ApplicationVersionSelectObjectSchema.optional(),
    include: ApplicationVersionIncludeObjectSchema.optional(),
    data: z.union([
      ApplicationVersionCreateInputObjectSchema,
      ApplicationVersionUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();

// File: createManyApplicationVersion.schema.ts

export const ApplicationVersionCreateManySchema: z.ZodType<Prisma.ApplicationVersionCreateManyArgs> =
  z
    .object({
      data: z.union([
        ApplicationVersionCreateManyInputObjectSchema,
        z.array(ApplicationVersionCreateManyInputObjectSchema),
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationVersionCreateManyArgs>;

export const ApplicationVersionCreateManyZodSchema = z
  .object({
    data: z.union([
      ApplicationVersionCreateManyInputObjectSchema,
      z.array(ApplicationVersionCreateManyInputObjectSchema),
    ]),
  })
  .strict();

// File: deleteOneApplicationVersion.schema.ts

export const ApplicationVersionDeleteOneSchema: z.ZodType<Prisma.ApplicationVersionDeleteArgs> = z
  .object({
    select: ApplicationVersionSelectObjectSchema.optional(),
    include: ApplicationVersionIncludeObjectSchema.optional(),
    where: ApplicationVersionWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationVersionDeleteArgs>;

export const ApplicationVersionDeleteOneZodSchema = z
  .object({
    select: ApplicationVersionSelectObjectSchema.optional(),
    include: ApplicationVersionIncludeObjectSchema.optional(),
    where: ApplicationVersionWhereUniqueInputObjectSchema,
  })
  .strict();

// File: deleteManyApplicationVersion.schema.ts

export const ApplicationVersionDeleteManySchema: z.ZodType<Prisma.ApplicationVersionDeleteManyArgs> =
  z
    .object({ where: ApplicationVersionWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.ApplicationVersionDeleteManyArgs>;

export const ApplicationVersionDeleteManyZodSchema = z
  .object({ where: ApplicationVersionWhereInputObjectSchema.optional() })
  .strict();

// File: updateOneApplicationVersion.schema.ts

export const ApplicationVersionUpdateOneSchema: z.ZodType<Prisma.ApplicationVersionUpdateArgs> = z
  .object({
    select: ApplicationVersionSelectObjectSchema.optional(),
    include: ApplicationVersionIncludeObjectSchema.optional(),
    data: z.union([
      ApplicationVersionUpdateInputObjectSchema,
      ApplicationVersionUncheckedUpdateInputObjectSchema,
    ]),
    where: ApplicationVersionWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationVersionUpdateArgs>;

export const ApplicationVersionUpdateOneZodSchema = z
  .object({
    select: ApplicationVersionSelectObjectSchema.optional(),
    include: ApplicationVersionIncludeObjectSchema.optional(),
    data: z.union([
      ApplicationVersionUpdateInputObjectSchema,
      ApplicationVersionUncheckedUpdateInputObjectSchema,
    ]),
    where: ApplicationVersionWhereUniqueInputObjectSchema,
  })
  .strict();

// File: updateManyApplicationVersion.schema.ts

export const ApplicationVersionUpdateManySchema: z.ZodType<Prisma.ApplicationVersionUpdateManyArgs> =
  z
    .object({
      data: ApplicationVersionUpdateManyMutationInputObjectSchema,
      where: ApplicationVersionWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationVersionUpdateManyArgs>;

export const ApplicationVersionUpdateManyZodSchema = z
  .object({
    data: ApplicationVersionUpdateManyMutationInputObjectSchema,
    where: ApplicationVersionWhereInputObjectSchema.optional(),
  })
  .strict();

// File: upsertOneApplicationVersion.schema.ts

export const ApplicationVersionUpsertOneSchema: z.ZodType<Prisma.ApplicationVersionUpsertArgs> = z
  .object({
    select: ApplicationVersionSelectObjectSchema.optional(),
    include: ApplicationVersionIncludeObjectSchema.optional(),
    where: ApplicationVersionWhereUniqueInputObjectSchema,
    create: z.union([
      ApplicationVersionCreateInputObjectSchema,
      ApplicationVersionUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      ApplicationVersionUpdateInputObjectSchema,
      ApplicationVersionUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationVersionUpsertArgs>;

export const ApplicationVersionUpsertOneZodSchema = z
  .object({
    select: ApplicationVersionSelectObjectSchema.optional(),
    include: ApplicationVersionIncludeObjectSchema.optional(),
    where: ApplicationVersionWhereUniqueInputObjectSchema,
    create: z.union([
      ApplicationVersionCreateInputObjectSchema,
      ApplicationVersionUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      ApplicationVersionUpdateInputObjectSchema,
      ApplicationVersionUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();

// File: aggregateApplicationVersion.schema.ts

export const ApplicationVersionAggregateSchema: z.ZodType<Prisma.ApplicationVersionAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          ApplicationVersionOrderByWithRelationInputObjectSchema,
          ApplicationVersionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: ApplicationVersionWhereInputObjectSchema.optional(),
      cursor: ApplicationVersionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([z.literal(true), ApplicationVersionCountAggregateInputObjectSchema])
        .optional(),
      _min: ApplicationVersionMinAggregateInputObjectSchema.optional(),
      _max: ApplicationVersionMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApplicationVersionAggregateArgs>;

export const ApplicationVersionAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        ApplicationVersionOrderByWithRelationInputObjectSchema,
        ApplicationVersionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApplicationVersionWhereInputObjectSchema.optional(),
    cursor: ApplicationVersionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), ApplicationVersionCountAggregateInputObjectSchema])
      .optional(),
    _min: ApplicationVersionMinAggregateInputObjectSchema.optional(),
    _max: ApplicationVersionMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: groupByApplicationVersion.schema.ts

export const ApplicationVersionGroupBySchema: z.ZodType<Prisma.ApplicationVersionGroupByArgs> = z
  .object({
    where: ApplicationVersionWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        ApplicationVersionOrderByWithAggregationInputObjectSchema,
        ApplicationVersionOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: ApplicationVersionScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(ApplicationVersionScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), ApplicationVersionCountAggregateInputObjectSchema])
      .optional(),
    _min: ApplicationVersionMinAggregateInputObjectSchema.optional(),
    _max: ApplicationVersionMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApplicationVersionGroupByArgs>;

export const ApplicationVersionGroupByZodSchema = z
  .object({
    where: ApplicationVersionWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        ApplicationVersionOrderByWithAggregationInputObjectSchema,
        ApplicationVersionOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: ApplicationVersionScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(ApplicationVersionScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), ApplicationVersionCountAggregateInputObjectSchema])
      .optional(),
    _min: ApplicationVersionMinAggregateInputObjectSchema.optional(),
    _max: ApplicationVersionMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: findUniqueUserApplication.schema.ts

export const UserApplicationFindUniqueSchema: z.ZodType<Prisma.UserApplicationFindUniqueArgs> = z
  .object({
    select: UserApplicationSelectObjectSchema.optional(),
    include: UserApplicationIncludeObjectSchema.optional(),
    where: UserApplicationWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationFindUniqueArgs>;

export const UserApplicationFindUniqueZodSchema = z
  .object({
    select: UserApplicationSelectObjectSchema.optional(),
    include: UserApplicationIncludeObjectSchema.optional(),
    where: UserApplicationWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findUniqueOrThrowUserApplication.schema.ts

export const UserApplicationFindUniqueOrThrowSchema: z.ZodType<Prisma.UserApplicationFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserApplicationSelectObjectSchema.optional(),
      include: UserApplicationIncludeObjectSchema.optional(),
      where: UserApplicationWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.UserApplicationFindUniqueOrThrowArgs>;

export const UserApplicationFindUniqueOrThrowZodSchema = z
  .object({
    select: UserApplicationSelectObjectSchema.optional(),
    include: UserApplicationIncludeObjectSchema.optional(),
    where: UserApplicationWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findFirstUserApplication.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserApplicationFindFirstSelectSchema__findFirstUserApplication_schema: z.ZodType<Prisma.UserApplicationSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      applicationId: z.boolean().optional(),
      user: z.boolean().optional(),
      application: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserApplicationSelect>;

export const UserApplicationFindFirstSelectZodSchema__findFirstUserApplication_schema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    applicationId: z.boolean().optional(),
    user: z.boolean().optional(),
    application: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

export const UserApplicationFindFirstSchema: z.ZodType<Prisma.UserApplicationFindFirstArgs> = z
  .object({
    select: UserApplicationFindFirstSelectSchema__findFirstUserApplication_schema.optional(),
    include: z.lazy(() => UserApplicationIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserApplicationOrderByWithRelationInputObjectSchema,
        UserApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserApplicationWhereInputObjectSchema.optional(),
    cursor: UserApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserApplicationScalarFieldEnumSchema, UserApplicationScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationFindFirstArgs>;

export const UserApplicationFindFirstZodSchema = z
  .object({
    select: UserApplicationFindFirstSelectSchema__findFirstUserApplication_schema.optional(),
    include: z.lazy(() => UserApplicationIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserApplicationOrderByWithRelationInputObjectSchema,
        UserApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserApplicationWhereInputObjectSchema.optional(),
    cursor: UserApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserApplicationScalarFieldEnumSchema, UserApplicationScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: findFirstOrThrowUserApplication.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserApplicationFindFirstOrThrowSelectSchema__findFirstOrThrowUserApplication_schema: z.ZodType<Prisma.UserApplicationSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      applicationId: z.boolean().optional(),
      user: z.boolean().optional(),
      application: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserApplicationSelect>;

export const UserApplicationFindFirstOrThrowSelectZodSchema__findFirstOrThrowUserApplication_schema =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      applicationId: z.boolean().optional(),
      user: z.boolean().optional(),
      application: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict();

export const UserApplicationFindFirstOrThrowSchema: z.ZodType<Prisma.UserApplicationFindFirstOrThrowArgs> =
  z
    .object({
      select:
        UserApplicationFindFirstOrThrowSelectSchema__findFirstOrThrowUserApplication_schema.optional(),
      include: z.lazy(() => UserApplicationIncludeObjectSchema.optional()),
      orderBy: z
        .union([
          UserApplicationOrderByWithRelationInputObjectSchema,
          UserApplicationOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: UserApplicationWhereInputObjectSchema.optional(),
      cursor: UserApplicationWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserApplicationScalarFieldEnumSchema, UserApplicationScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserApplicationFindFirstOrThrowArgs>;

export const UserApplicationFindFirstOrThrowZodSchema = z
  .object({
    select:
      UserApplicationFindFirstOrThrowSelectSchema__findFirstOrThrowUserApplication_schema.optional(),
    include: z.lazy(() => UserApplicationIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserApplicationOrderByWithRelationInputObjectSchema,
        UserApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserApplicationWhereInputObjectSchema.optional(),
    cursor: UserApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserApplicationScalarFieldEnumSchema, UserApplicationScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: findManyUserApplication.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserApplicationFindManySelectSchema__findManyUserApplication_schema: z.ZodType<Prisma.UserApplicationSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      applicationId: z.boolean().optional(),
      user: z.boolean().optional(),
      application: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserApplicationSelect>;

export const UserApplicationFindManySelectZodSchema__findManyUserApplication_schema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    applicationId: z.boolean().optional(),
    user: z.boolean().optional(),
    application: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

export const UserApplicationFindManySchema: z.ZodType<Prisma.UserApplicationFindManyArgs> = z
  .object({
    select: UserApplicationFindManySelectSchema__findManyUserApplication_schema.optional(),
    include: z.lazy(() => UserApplicationIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserApplicationOrderByWithRelationInputObjectSchema,
        UserApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserApplicationWhereInputObjectSchema.optional(),
    cursor: UserApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserApplicationScalarFieldEnumSchema, UserApplicationScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationFindManyArgs>;

export const UserApplicationFindManyZodSchema = z
  .object({
    select: UserApplicationFindManySelectSchema__findManyUserApplication_schema.optional(),
    include: z.lazy(() => UserApplicationIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        UserApplicationOrderByWithRelationInputObjectSchema,
        UserApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserApplicationWhereInputObjectSchema.optional(),
    cursor: UserApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserApplicationScalarFieldEnumSchema, UserApplicationScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: countUserApplication.schema.ts

export const UserApplicationCountSchema: z.ZodType<Prisma.UserApplicationCountArgs> = z
  .object({
    orderBy: z
      .union([
        UserApplicationOrderByWithRelationInputObjectSchema,
        UserApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserApplicationWhereInputObjectSchema.optional(),
    cursor: UserApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), UserApplicationCountAggregateInputObjectSchema]).optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationCountArgs>;

export const UserApplicationCountZodSchema = z
  .object({
    orderBy: z
      .union([
        UserApplicationOrderByWithRelationInputObjectSchema,
        UserApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserApplicationWhereInputObjectSchema.optional(),
    cursor: UserApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), UserApplicationCountAggregateInputObjectSchema]).optional(),
  })
  .strict();

// File: createOneUserApplication.schema.ts

export const UserApplicationCreateOneSchema: z.ZodType<Prisma.UserApplicationCreateArgs> = z
  .object({
    select: UserApplicationSelectObjectSchema.optional(),
    include: UserApplicationIncludeObjectSchema.optional(),
    data: z.union([
      UserApplicationCreateInputObjectSchema,
      UserApplicationUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationCreateArgs>;

export const UserApplicationCreateOneZodSchema = z
  .object({
    select: UserApplicationSelectObjectSchema.optional(),
    include: UserApplicationIncludeObjectSchema.optional(),
    data: z.union([
      UserApplicationCreateInputObjectSchema,
      UserApplicationUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();

// File: createManyUserApplication.schema.ts

export const UserApplicationCreateManySchema: z.ZodType<Prisma.UserApplicationCreateManyArgs> = z
  .object({
    data: z.union([
      UserApplicationCreateManyInputObjectSchema,
      z.array(UserApplicationCreateManyInputObjectSchema),
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationCreateManyArgs>;

export const UserApplicationCreateManyZodSchema = z
  .object({
    data: z.union([
      UserApplicationCreateManyInputObjectSchema,
      z.array(UserApplicationCreateManyInputObjectSchema),
    ]),
  })
  .strict();

// File: deleteOneUserApplication.schema.ts

export const UserApplicationDeleteOneSchema: z.ZodType<Prisma.UserApplicationDeleteArgs> = z
  .object({
    select: UserApplicationSelectObjectSchema.optional(),
    include: UserApplicationIncludeObjectSchema.optional(),
    where: UserApplicationWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationDeleteArgs>;

export const UserApplicationDeleteOneZodSchema = z
  .object({
    select: UserApplicationSelectObjectSchema.optional(),
    include: UserApplicationIncludeObjectSchema.optional(),
    where: UserApplicationWhereUniqueInputObjectSchema,
  })
  .strict();

// File: deleteManyUserApplication.schema.ts

export const UserApplicationDeleteManySchema: z.ZodType<Prisma.UserApplicationDeleteManyArgs> = z
  .object({ where: UserApplicationWhereInputObjectSchema.optional() })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationDeleteManyArgs>;

export const UserApplicationDeleteManyZodSchema = z
  .object({ where: UserApplicationWhereInputObjectSchema.optional() })
  .strict();

// File: updateOneUserApplication.schema.ts

export const UserApplicationUpdateOneSchema: z.ZodType<Prisma.UserApplicationUpdateArgs> = z
  .object({
    select: UserApplicationSelectObjectSchema.optional(),
    include: UserApplicationIncludeObjectSchema.optional(),
    data: z.union([
      UserApplicationUpdateInputObjectSchema,
      UserApplicationUncheckedUpdateInputObjectSchema,
    ]),
    where: UserApplicationWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationUpdateArgs>;

export const UserApplicationUpdateOneZodSchema = z
  .object({
    select: UserApplicationSelectObjectSchema.optional(),
    include: UserApplicationIncludeObjectSchema.optional(),
    data: z.union([
      UserApplicationUpdateInputObjectSchema,
      UserApplicationUncheckedUpdateInputObjectSchema,
    ]),
    where: UserApplicationWhereUniqueInputObjectSchema,
  })
  .strict();

// File: updateManyUserApplication.schema.ts

export const UserApplicationUpdateManySchema: z.ZodType<Prisma.UserApplicationUpdateManyArgs> = z
  .object({
    data: UserApplicationUpdateManyMutationInputObjectSchema,
    where: UserApplicationWhereInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationUpdateManyArgs>;

export const UserApplicationUpdateManyZodSchema = z
  .object({
    data: UserApplicationUpdateManyMutationInputObjectSchema,
    where: UserApplicationWhereInputObjectSchema.optional(),
  })
  .strict();

// File: upsertOneUserApplication.schema.ts

export const UserApplicationUpsertOneSchema: z.ZodType<Prisma.UserApplicationUpsertArgs> = z
  .object({
    select: UserApplicationSelectObjectSchema.optional(),
    include: UserApplicationIncludeObjectSchema.optional(),
    where: UserApplicationWhereUniqueInputObjectSchema,
    create: z.union([
      UserApplicationCreateInputObjectSchema,
      UserApplicationUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      UserApplicationUpdateInputObjectSchema,
      UserApplicationUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationUpsertArgs>;

export const UserApplicationUpsertOneZodSchema = z
  .object({
    select: UserApplicationSelectObjectSchema.optional(),
    include: UserApplicationIncludeObjectSchema.optional(),
    where: UserApplicationWhereUniqueInputObjectSchema,
    create: z.union([
      UserApplicationCreateInputObjectSchema,
      UserApplicationUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      UserApplicationUpdateInputObjectSchema,
      UserApplicationUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();

// File: aggregateUserApplication.schema.ts

export const UserApplicationAggregateSchema: z.ZodType<Prisma.UserApplicationAggregateArgs> = z
  .object({
    orderBy: z
      .union([
        UserApplicationOrderByWithRelationInputObjectSchema,
        UserApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserApplicationWhereInputObjectSchema.optional(),
    cursor: UserApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), UserApplicationCountAggregateInputObjectSchema]).optional(),
    _min: UserApplicationMinAggregateInputObjectSchema.optional(),
    _max: UserApplicationMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationAggregateArgs>;

export const UserApplicationAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        UserApplicationOrderByWithRelationInputObjectSchema,
        UserApplicationOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserApplicationWhereInputObjectSchema.optional(),
    cursor: UserApplicationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), UserApplicationCountAggregateInputObjectSchema]).optional(),
    _min: UserApplicationMinAggregateInputObjectSchema.optional(),
    _max: UserApplicationMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: groupByUserApplication.schema.ts

export const UserApplicationGroupBySchema: z.ZodType<Prisma.UserApplicationGroupByArgs> = z
  .object({
    where: UserApplicationWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        UserApplicationOrderByWithAggregationInputObjectSchema,
        UserApplicationOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: UserApplicationScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(UserApplicationScalarFieldEnumSchema),
    _count: z.union([z.literal(true), UserApplicationCountAggregateInputObjectSchema]).optional(),
    _min: UserApplicationMinAggregateInputObjectSchema.optional(),
    _max: UserApplicationMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserApplicationGroupByArgs>;

export const UserApplicationGroupByZodSchema = z
  .object({
    where: UserApplicationWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        UserApplicationOrderByWithAggregationInputObjectSchema,
        UserApplicationOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: UserApplicationScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(UserApplicationScalarFieldEnumSchema),
    _count: z.union([z.literal(true), UserApplicationCountAggregateInputObjectSchema]).optional(),
    _min: UserApplicationMinAggregateInputObjectSchema.optional(),
    _max: UserApplicationMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: findUniqueApiKey.schema.ts

export const ApiKeyFindUniqueSchema: z.ZodType<Prisma.ApiKeyFindUniqueArgs> = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    where: ApiKeyWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyFindUniqueArgs>;

export const ApiKeyFindUniqueZodSchema = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    where: ApiKeyWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findUniqueOrThrowApiKey.schema.ts

export const ApiKeyFindUniqueOrThrowSchema: z.ZodType<Prisma.ApiKeyFindUniqueOrThrowArgs> = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    where: ApiKeyWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyFindUniqueOrThrowArgs>;

export const ApiKeyFindUniqueOrThrowZodSchema = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    where: ApiKeyWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findFirstApiKey.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApiKeyFindFirstSelectSchema__findFirstApiKey_schema: z.ZodType<Prisma.ApiKeySelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    encryptedKey: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeySelect>;

export const ApiKeyFindFirstSelectZodSchema__findFirstApiKey_schema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    encryptedKey: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

export const ApiKeyFindFirstSchema: z.ZodType<Prisma.ApiKeyFindFirstArgs> = z
  .object({
    select: ApiKeyFindFirstSelectSchema__findFirstApiKey_schema.optional(),
    include: z.lazy(() => ApiKeyIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApiKeyOrderByWithRelationInputObjectSchema,
        ApiKeyOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApiKeyWhereInputObjectSchema.optional(),
    cursor: ApiKeyWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ApiKeyScalarFieldEnumSchema, ApiKeyScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyFindFirstArgs>;

export const ApiKeyFindFirstZodSchema = z
  .object({
    select: ApiKeyFindFirstSelectSchema__findFirstApiKey_schema.optional(),
    include: z.lazy(() => ApiKeyIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApiKeyOrderByWithRelationInputObjectSchema,
        ApiKeyOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApiKeyWhereInputObjectSchema.optional(),
    cursor: ApiKeyWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ApiKeyScalarFieldEnumSchema, ApiKeyScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: findFirstOrThrowApiKey.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApiKeyFindFirstOrThrowSelectSchema__findFirstOrThrowApiKey_schema: z.ZodType<Prisma.ApiKeySelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      user: z.boolean().optional(),
      provider: z.boolean().optional(),
      encryptedKey: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.ApiKeySelect>;

export const ApiKeyFindFirstOrThrowSelectZodSchema__findFirstOrThrowApiKey_schema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    encryptedKey: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

export const ApiKeyFindFirstOrThrowSchema: z.ZodType<Prisma.ApiKeyFindFirstOrThrowArgs> = z
  .object({
    select: ApiKeyFindFirstOrThrowSelectSchema__findFirstOrThrowApiKey_schema.optional(),
    include: z.lazy(() => ApiKeyIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApiKeyOrderByWithRelationInputObjectSchema,
        ApiKeyOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApiKeyWhereInputObjectSchema.optional(),
    cursor: ApiKeyWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ApiKeyScalarFieldEnumSchema, ApiKeyScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyFindFirstOrThrowArgs>;

export const ApiKeyFindFirstOrThrowZodSchema = z
  .object({
    select: ApiKeyFindFirstOrThrowSelectSchema__findFirstOrThrowApiKey_schema.optional(),
    include: z.lazy(() => ApiKeyIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApiKeyOrderByWithRelationInputObjectSchema,
        ApiKeyOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApiKeyWhereInputObjectSchema.optional(),
    cursor: ApiKeyWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ApiKeyScalarFieldEnumSchema, ApiKeyScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: findManyApiKey.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApiKeyFindManySelectSchema__findManyApiKey_schema: z.ZodType<Prisma.ApiKeySelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    encryptedKey: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeySelect>;

export const ApiKeyFindManySelectZodSchema__findManyApiKey_schema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    encryptedKey: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

export const ApiKeyFindManySchema: z.ZodType<Prisma.ApiKeyFindManyArgs> = z
  .object({
    select: ApiKeyFindManySelectSchema__findManyApiKey_schema.optional(),
    include: z.lazy(() => ApiKeyIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApiKeyOrderByWithRelationInputObjectSchema,
        ApiKeyOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApiKeyWhereInputObjectSchema.optional(),
    cursor: ApiKeyWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ApiKeyScalarFieldEnumSchema, ApiKeyScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyFindManyArgs>;

export const ApiKeyFindManyZodSchema = z
  .object({
    select: ApiKeyFindManySelectSchema__findManyApiKey_schema.optional(),
    include: z.lazy(() => ApiKeyIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        ApiKeyOrderByWithRelationInputObjectSchema,
        ApiKeyOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApiKeyWhereInputObjectSchema.optional(),
    cursor: ApiKeyWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ApiKeyScalarFieldEnumSchema, ApiKeyScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: countApiKey.schema.ts

export const ApiKeyCountSchema: z.ZodType<Prisma.ApiKeyCountArgs> = z
  .object({
    orderBy: z
      .union([
        ApiKeyOrderByWithRelationInputObjectSchema,
        ApiKeyOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApiKeyWhereInputObjectSchema.optional(),
    cursor: ApiKeyWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), ApiKeyCountAggregateInputObjectSchema]).optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyCountArgs>;

export const ApiKeyCountZodSchema = z
  .object({
    orderBy: z
      .union([
        ApiKeyOrderByWithRelationInputObjectSchema,
        ApiKeyOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApiKeyWhereInputObjectSchema.optional(),
    cursor: ApiKeyWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), ApiKeyCountAggregateInputObjectSchema]).optional(),
  })
  .strict();

// File: createOneApiKey.schema.ts

export const ApiKeyCreateOneSchema: z.ZodType<Prisma.ApiKeyCreateArgs> = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    data: z.union([ApiKeyCreateInputObjectSchema, ApiKeyUncheckedCreateInputObjectSchema]),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyCreateArgs>;

export const ApiKeyCreateOneZodSchema = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    data: z.union([ApiKeyCreateInputObjectSchema, ApiKeyUncheckedCreateInputObjectSchema]),
  })
  .strict();

// File: createManyApiKey.schema.ts

export const ApiKeyCreateManySchema: z.ZodType<Prisma.ApiKeyCreateManyArgs> = z
  .object({
    data: z.union([ApiKeyCreateManyInputObjectSchema, z.array(ApiKeyCreateManyInputObjectSchema)]),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyCreateManyArgs>;

export const ApiKeyCreateManyZodSchema = z
  .object({
    data: z.union([ApiKeyCreateManyInputObjectSchema, z.array(ApiKeyCreateManyInputObjectSchema)]),
  })
  .strict();

// File: deleteOneApiKey.schema.ts

export const ApiKeyDeleteOneSchema: z.ZodType<Prisma.ApiKeyDeleteArgs> = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    where: ApiKeyWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyDeleteArgs>;

export const ApiKeyDeleteOneZodSchema = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    where: ApiKeyWhereUniqueInputObjectSchema,
  })
  .strict();

// File: deleteManyApiKey.schema.ts

export const ApiKeyDeleteManySchema: z.ZodType<Prisma.ApiKeyDeleteManyArgs> = z
  .object({ where: ApiKeyWhereInputObjectSchema.optional() })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyDeleteManyArgs>;

export const ApiKeyDeleteManyZodSchema = z
  .object({ where: ApiKeyWhereInputObjectSchema.optional() })
  .strict();

// File: updateOneApiKey.schema.ts

export const ApiKeyUpdateOneSchema: z.ZodType<Prisma.ApiKeyUpdateArgs> = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    data: z.union([ApiKeyUpdateInputObjectSchema, ApiKeyUncheckedUpdateInputObjectSchema]),
    where: ApiKeyWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyUpdateArgs>;

export const ApiKeyUpdateOneZodSchema = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    data: z.union([ApiKeyUpdateInputObjectSchema, ApiKeyUncheckedUpdateInputObjectSchema]),
    where: ApiKeyWhereUniqueInputObjectSchema,
  })
  .strict();

// File: updateManyApiKey.schema.ts

export const ApiKeyUpdateManySchema: z.ZodType<Prisma.ApiKeyUpdateManyArgs> = z
  .object({
    data: ApiKeyUpdateManyMutationInputObjectSchema,
    where: ApiKeyWhereInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyUpdateManyArgs>;

export const ApiKeyUpdateManyZodSchema = z
  .object({
    data: ApiKeyUpdateManyMutationInputObjectSchema,
    where: ApiKeyWhereInputObjectSchema.optional(),
  })
  .strict();

// File: upsertOneApiKey.schema.ts

export const ApiKeyUpsertOneSchema: z.ZodType<Prisma.ApiKeyUpsertArgs> = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    where: ApiKeyWhereUniqueInputObjectSchema,
    create: z.union([ApiKeyCreateInputObjectSchema, ApiKeyUncheckedCreateInputObjectSchema]),
    update: z.union([ApiKeyUpdateInputObjectSchema, ApiKeyUncheckedUpdateInputObjectSchema]),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyUpsertArgs>;

export const ApiKeyUpsertOneZodSchema = z
  .object({
    select: ApiKeySelectObjectSchema.optional(),
    include: ApiKeyIncludeObjectSchema.optional(),
    where: ApiKeyWhereUniqueInputObjectSchema,
    create: z.union([ApiKeyCreateInputObjectSchema, ApiKeyUncheckedCreateInputObjectSchema]),
    update: z.union([ApiKeyUpdateInputObjectSchema, ApiKeyUncheckedUpdateInputObjectSchema]),
  })
  .strict();

// File: aggregateApiKey.schema.ts

export const ApiKeyAggregateSchema: z.ZodType<Prisma.ApiKeyAggregateArgs> = z
  .object({
    orderBy: z
      .union([
        ApiKeyOrderByWithRelationInputObjectSchema,
        ApiKeyOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApiKeyWhereInputObjectSchema.optional(),
    cursor: ApiKeyWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), ApiKeyCountAggregateInputObjectSchema]).optional(),
    _min: ApiKeyMinAggregateInputObjectSchema.optional(),
    _max: ApiKeyMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyAggregateArgs>;

export const ApiKeyAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        ApiKeyOrderByWithRelationInputObjectSchema,
        ApiKeyOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: ApiKeyWhereInputObjectSchema.optional(),
    cursor: ApiKeyWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), ApiKeyCountAggregateInputObjectSchema]).optional(),
    _min: ApiKeyMinAggregateInputObjectSchema.optional(),
    _max: ApiKeyMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: groupByApiKey.schema.ts

export const ApiKeyGroupBySchema: z.ZodType<Prisma.ApiKeyGroupByArgs> = z
  .object({
    where: ApiKeyWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        ApiKeyOrderByWithAggregationInputObjectSchema,
        ApiKeyOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: ApiKeyScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(ApiKeyScalarFieldEnumSchema),
    _count: z.union([z.literal(true), ApiKeyCountAggregateInputObjectSchema]).optional(),
    _min: ApiKeyMinAggregateInputObjectSchema.optional(),
    _max: ApiKeyMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.ApiKeyGroupByArgs>;

export const ApiKeyGroupByZodSchema = z
  .object({
    where: ApiKeyWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        ApiKeyOrderByWithAggregationInputObjectSchema,
        ApiKeyOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: ApiKeyScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(ApiKeyScalarFieldEnumSchema),
    _count: z.union([z.literal(true), ApiKeyCountAggregateInputObjectSchema]).optional(),
    _min: ApiKeyMinAggregateInputObjectSchema.optional(),
    _max: ApiKeyMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: findUniqueSettings.schema.ts

export const SettingsFindUniqueSchema: z.ZodType<Prisma.SettingsFindUniqueArgs> = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    where: SettingsWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsFindUniqueArgs>;

export const SettingsFindUniqueZodSchema = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    where: SettingsWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findUniqueOrThrowSettings.schema.ts

export const SettingsFindUniqueOrThrowSchema: z.ZodType<Prisma.SettingsFindUniqueOrThrowArgs> = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    where: SettingsWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsFindUniqueOrThrowArgs>;

export const SettingsFindUniqueOrThrowZodSchema = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    where: SettingsWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findFirstSettings.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SettingsFindFirstSelectSchema__findFirstSettings_schema: z.ZodType<Prisma.SettingsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      user: z.boolean().optional(),
      volume: z.boolean().optional(),
      language: z.boolean().optional(),
      theme: z.boolean().optional(),
      accentColorLight: z.boolean().optional(),
      accentColorDark: z.boolean().optional(),
      sttProviderName: z.boolean().optional(),
      llmProviderName: z.boolean().optional(),
      llmModel: z.boolean().optional(),
      ttsProviderName: z.boolean().optional(),
      welcomeTitle: z.boolean().optional(),
      idleTimeoutSeconds: z.boolean().optional(),
      idleMode: z.boolean().optional(),
      idleCustomImagePath: z.boolean().optional(),
      idleRemoteEndpoint: z.boolean().optional(),
      modelScene: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.SettingsSelect>;

export const SettingsFindFirstSelectZodSchema__findFirstSettings_schema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    volume: z.boolean().optional(),
    language: z.boolean().optional(),
    theme: z.boolean().optional(),
    accentColorLight: z.boolean().optional(),
    accentColorDark: z.boolean().optional(),
    sttProviderName: z.boolean().optional(),
    llmProviderName: z.boolean().optional(),
    llmModel: z.boolean().optional(),
    ttsProviderName: z.boolean().optional(),
    welcomeTitle: z.boolean().optional(),
    idleTimeoutSeconds: z.boolean().optional(),
    idleMode: z.boolean().optional(),
    idleCustomImagePath: z.boolean().optional(),
    idleRemoteEndpoint: z.boolean().optional(),
    modelScene: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

export const SettingsFindFirstSchema: z.ZodType<Prisma.SettingsFindFirstArgs> = z
  .object({
    select: SettingsFindFirstSelectSchema__findFirstSettings_schema.optional(),
    include: z.lazy(() => SettingsIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        SettingsOrderByWithRelationInputObjectSchema,
        SettingsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingsWhereInputObjectSchema.optional(),
    cursor: SettingsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([SettingsScalarFieldEnumSchema, SettingsScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsFindFirstArgs>;

export const SettingsFindFirstZodSchema = z
  .object({
    select: SettingsFindFirstSelectSchema__findFirstSettings_schema.optional(),
    include: z.lazy(() => SettingsIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        SettingsOrderByWithRelationInputObjectSchema,
        SettingsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingsWhereInputObjectSchema.optional(),
    cursor: SettingsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([SettingsScalarFieldEnumSchema, SettingsScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: findFirstOrThrowSettings.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SettingsFindFirstOrThrowSelectSchema__findFirstOrThrowSettings_schema: z.ZodType<Prisma.SettingsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      user: z.boolean().optional(),
      volume: z.boolean().optional(),
      language: z.boolean().optional(),
      theme: z.boolean().optional(),
      accentColorLight: z.boolean().optional(),
      accentColorDark: z.boolean().optional(),
      sttProviderName: z.boolean().optional(),
      llmProviderName: z.boolean().optional(),
      llmModel: z.boolean().optional(),
      ttsProviderName: z.boolean().optional(),
      welcomeTitle: z.boolean().optional(),
      idleTimeoutSeconds: z.boolean().optional(),
      idleMode: z.boolean().optional(),
      idleCustomImagePath: z.boolean().optional(),
      idleRemoteEndpoint: z.boolean().optional(),
      modelScene: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.SettingsSelect>;

export const SettingsFindFirstOrThrowSelectZodSchema__findFirstOrThrowSettings_schema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    volume: z.boolean().optional(),
    language: z.boolean().optional(),
    theme: z.boolean().optional(),
    accentColorLight: z.boolean().optional(),
    accentColorDark: z.boolean().optional(),
    sttProviderName: z.boolean().optional(),
    llmProviderName: z.boolean().optional(),
    llmModel: z.boolean().optional(),
    ttsProviderName: z.boolean().optional(),
    welcomeTitle: z.boolean().optional(),
    idleTimeoutSeconds: z.boolean().optional(),
    idleMode: z.boolean().optional(),
    idleCustomImagePath: z.boolean().optional(),
    idleRemoteEndpoint: z.boolean().optional(),
    modelScene: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

export const SettingsFindFirstOrThrowSchema: z.ZodType<Prisma.SettingsFindFirstOrThrowArgs> = z
  .object({
    select: SettingsFindFirstOrThrowSelectSchema__findFirstOrThrowSettings_schema.optional(),
    include: z.lazy(() => SettingsIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        SettingsOrderByWithRelationInputObjectSchema,
        SettingsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingsWhereInputObjectSchema.optional(),
    cursor: SettingsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([SettingsScalarFieldEnumSchema, SettingsScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsFindFirstOrThrowArgs>;

export const SettingsFindFirstOrThrowZodSchema = z
  .object({
    select: SettingsFindFirstOrThrowSelectSchema__findFirstOrThrowSettings_schema.optional(),
    include: z.lazy(() => SettingsIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        SettingsOrderByWithRelationInputObjectSchema,
        SettingsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingsWhereInputObjectSchema.optional(),
    cursor: SettingsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([SettingsScalarFieldEnumSchema, SettingsScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: findManySettings.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SettingsFindManySelectSchema__findManySettings_schema: z.ZodType<Prisma.SettingsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      user: z.boolean().optional(),
      volume: z.boolean().optional(),
      language: z.boolean().optional(),
      theme: z.boolean().optional(),
      accentColorLight: z.boolean().optional(),
      accentColorDark: z.boolean().optional(),
      sttProviderName: z.boolean().optional(),
      llmProviderName: z.boolean().optional(),
      llmModel: z.boolean().optional(),
      ttsProviderName: z.boolean().optional(),
      welcomeTitle: z.boolean().optional(),
      idleTimeoutSeconds: z.boolean().optional(),
      idleMode: z.boolean().optional(),
      idleCustomImagePath: z.boolean().optional(),
      idleRemoteEndpoint: z.boolean().optional(),
      modelScene: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.SettingsSelect>;

export const SettingsFindManySelectZodSchema__findManySettings_schema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    volume: z.boolean().optional(),
    language: z.boolean().optional(),
    theme: z.boolean().optional(),
    accentColorLight: z.boolean().optional(),
    accentColorDark: z.boolean().optional(),
    sttProviderName: z.boolean().optional(),
    llmProviderName: z.boolean().optional(),
    llmModel: z.boolean().optional(),
    ttsProviderName: z.boolean().optional(),
    welcomeTitle: z.boolean().optional(),
    idleTimeoutSeconds: z.boolean().optional(),
    idleMode: z.boolean().optional(),
    idleCustomImagePath: z.boolean().optional(),
    idleRemoteEndpoint: z.boolean().optional(),
    modelScene: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

export const SettingsFindManySchema: z.ZodType<Prisma.SettingsFindManyArgs> = z
  .object({
    select: SettingsFindManySelectSchema__findManySettings_schema.optional(),
    include: z.lazy(() => SettingsIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        SettingsOrderByWithRelationInputObjectSchema,
        SettingsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingsWhereInputObjectSchema.optional(),
    cursor: SettingsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([SettingsScalarFieldEnumSchema, SettingsScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsFindManyArgs>;

export const SettingsFindManyZodSchema = z
  .object({
    select: SettingsFindManySelectSchema__findManySettings_schema.optional(),
    include: z.lazy(() => SettingsIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        SettingsOrderByWithRelationInputObjectSchema,
        SettingsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingsWhereInputObjectSchema.optional(),
    cursor: SettingsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([SettingsScalarFieldEnumSchema, SettingsScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: countSettings.schema.ts

export const SettingsCountSchema: z.ZodType<Prisma.SettingsCountArgs> = z
  .object({
    orderBy: z
      .union([
        SettingsOrderByWithRelationInputObjectSchema,
        SettingsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingsWhereInputObjectSchema.optional(),
    cursor: SettingsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), SettingsCountAggregateInputObjectSchema]).optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsCountArgs>;

export const SettingsCountZodSchema = z
  .object({
    orderBy: z
      .union([
        SettingsOrderByWithRelationInputObjectSchema,
        SettingsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingsWhereInputObjectSchema.optional(),
    cursor: SettingsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), SettingsCountAggregateInputObjectSchema]).optional(),
  })
  .strict();

// File: createOneSettings.schema.ts

export const SettingsCreateOneSchema: z.ZodType<Prisma.SettingsCreateArgs> = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    data: z.union([SettingsCreateInputObjectSchema, SettingsUncheckedCreateInputObjectSchema]),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsCreateArgs>;

export const SettingsCreateOneZodSchema = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    data: z.union([SettingsCreateInputObjectSchema, SettingsUncheckedCreateInputObjectSchema]),
  })
  .strict();

// File: createManySettings.schema.ts

export const SettingsCreateManySchema: z.ZodType<Prisma.SettingsCreateManyArgs> = z
  .object({
    data: z.union([
      SettingsCreateManyInputObjectSchema,
      z.array(SettingsCreateManyInputObjectSchema),
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsCreateManyArgs>;

export const SettingsCreateManyZodSchema = z
  .object({
    data: z.union([
      SettingsCreateManyInputObjectSchema,
      z.array(SettingsCreateManyInputObjectSchema),
    ]),
  })
  .strict();

// File: deleteOneSettings.schema.ts

export const SettingsDeleteOneSchema: z.ZodType<Prisma.SettingsDeleteArgs> = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    where: SettingsWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsDeleteArgs>;

export const SettingsDeleteOneZodSchema = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    where: SettingsWhereUniqueInputObjectSchema,
  })
  .strict();

// File: deleteManySettings.schema.ts

export const SettingsDeleteManySchema: z.ZodType<Prisma.SettingsDeleteManyArgs> = z
  .object({ where: SettingsWhereInputObjectSchema.optional() })
  .strict() as unknown as z.ZodType<Prisma.SettingsDeleteManyArgs>;

export const SettingsDeleteManyZodSchema = z
  .object({ where: SettingsWhereInputObjectSchema.optional() })
  .strict();

// File: updateOneSettings.schema.ts

export const SettingsUpdateOneSchema: z.ZodType<Prisma.SettingsUpdateArgs> = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    data: z.union([SettingsUpdateInputObjectSchema, SettingsUncheckedUpdateInputObjectSchema]),
    where: SettingsWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsUpdateArgs>;

export const SettingsUpdateOneZodSchema = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    data: z.union([SettingsUpdateInputObjectSchema, SettingsUncheckedUpdateInputObjectSchema]),
    where: SettingsWhereUniqueInputObjectSchema,
  })
  .strict();

// File: updateManySettings.schema.ts

export const SettingsUpdateManySchema: z.ZodType<Prisma.SettingsUpdateManyArgs> = z
  .object({
    data: SettingsUpdateManyMutationInputObjectSchema,
    where: SettingsWhereInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsUpdateManyArgs>;

export const SettingsUpdateManyZodSchema = z
  .object({
    data: SettingsUpdateManyMutationInputObjectSchema,
    where: SettingsWhereInputObjectSchema.optional(),
  })
  .strict();

// File: upsertOneSettings.schema.ts

export const SettingsUpsertOneSchema: z.ZodType<Prisma.SettingsUpsertArgs> = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    where: SettingsWhereUniqueInputObjectSchema,
    create: z.union([SettingsCreateInputObjectSchema, SettingsUncheckedCreateInputObjectSchema]),
    update: z.union([SettingsUpdateInputObjectSchema, SettingsUncheckedUpdateInputObjectSchema]),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsUpsertArgs>;

export const SettingsUpsertOneZodSchema = z
  .object({
    select: SettingsSelectObjectSchema.optional(),
    include: SettingsIncludeObjectSchema.optional(),
    where: SettingsWhereUniqueInputObjectSchema,
    create: z.union([SettingsCreateInputObjectSchema, SettingsUncheckedCreateInputObjectSchema]),
    update: z.union([SettingsUpdateInputObjectSchema, SettingsUncheckedUpdateInputObjectSchema]),
  })
  .strict();

// File: aggregateSettings.schema.ts

export const SettingsAggregateSchema: z.ZodType<Prisma.SettingsAggregateArgs> = z
  .object({
    orderBy: z
      .union([
        SettingsOrderByWithRelationInputObjectSchema,
        SettingsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingsWhereInputObjectSchema.optional(),
    cursor: SettingsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), SettingsCountAggregateInputObjectSchema]).optional(),
    _min: SettingsMinAggregateInputObjectSchema.optional(),
    _max: SettingsMaxAggregateInputObjectSchema.optional(),
    _avg: SettingsAvgAggregateInputObjectSchema.optional(),
    _sum: SettingsSumAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsAggregateArgs>;

export const SettingsAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        SettingsOrderByWithRelationInputObjectSchema,
        SettingsOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingsWhereInputObjectSchema.optional(),
    cursor: SettingsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), SettingsCountAggregateInputObjectSchema]).optional(),
    _min: SettingsMinAggregateInputObjectSchema.optional(),
    _max: SettingsMaxAggregateInputObjectSchema.optional(),
    _avg: SettingsAvgAggregateInputObjectSchema.optional(),
    _sum: SettingsSumAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: groupBySettings.schema.ts

export const SettingsGroupBySchema: z.ZodType<Prisma.SettingsGroupByArgs> = z
  .object({
    where: SettingsWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        SettingsOrderByWithAggregationInputObjectSchema,
        SettingsOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: SettingsScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(SettingsScalarFieldEnumSchema),
    _count: z.union([z.literal(true), SettingsCountAggregateInputObjectSchema]).optional(),
    _min: SettingsMinAggregateInputObjectSchema.optional(),
    _max: SettingsMaxAggregateInputObjectSchema.optional(),
    _avg: SettingsAvgAggregateInputObjectSchema.optional(),
    _sum: SettingsSumAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingsGroupByArgs>;

export const SettingsGroupByZodSchema = z
  .object({
    where: SettingsWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        SettingsOrderByWithAggregationInputObjectSchema,
        SettingsOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: SettingsScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(SettingsScalarFieldEnumSchema),
    _count: z.union([z.literal(true), SettingsCountAggregateInputObjectSchema]).optional(),
    _min: SettingsMinAggregateInputObjectSchema.optional(),
    _max: SettingsMaxAggregateInputObjectSchema.optional(),
    _avg: SettingsAvgAggregateInputObjectSchema.optional(),
    _sum: SettingsSumAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: findUniqueDialog.schema.ts

export const DialogFindUniqueSchema: z.ZodType<Prisma.DialogFindUniqueArgs> = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    where: DialogWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.DialogFindUniqueArgs>;

export const DialogFindUniqueZodSchema = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    where: DialogWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findUniqueOrThrowDialog.schema.ts

export const DialogFindUniqueOrThrowSchema: z.ZodType<Prisma.DialogFindUniqueOrThrowArgs> = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    where: DialogWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.DialogFindUniqueOrThrowArgs>;

export const DialogFindUniqueOrThrowZodSchema = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    where: DialogWhereUniqueInputObjectSchema,
  })
  .strict();

// File: findFirstDialog.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DialogFindFirstSelectSchema__findFirstDialog_schema: z.ZodType<Prisma.DialogSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    dialogId: z.boolean().optional(),
    title: z.boolean().optional(),
    messages: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogSelect>;

export const DialogFindFirstSelectZodSchema__findFirstDialog_schema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    dialogId: z.boolean().optional(),
    title: z.boolean().optional(),
    messages: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

export const DialogFindFirstSchema: z.ZodType<Prisma.DialogFindFirstArgs> = z
  .object({
    select: DialogFindFirstSelectSchema__findFirstDialog_schema.optional(),
    include: z.lazy(() => DialogIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        DialogOrderByWithRelationInputObjectSchema,
        DialogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DialogWhereInputObjectSchema.optional(),
    cursor: DialogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([DialogScalarFieldEnumSchema, DialogScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogFindFirstArgs>;

export const DialogFindFirstZodSchema = z
  .object({
    select: DialogFindFirstSelectSchema__findFirstDialog_schema.optional(),
    include: z.lazy(() => DialogIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        DialogOrderByWithRelationInputObjectSchema,
        DialogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DialogWhereInputObjectSchema.optional(),
    cursor: DialogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([DialogScalarFieldEnumSchema, DialogScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: findFirstOrThrowDialog.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DialogFindFirstOrThrowSelectSchema__findFirstOrThrowDialog_schema: z.ZodType<Prisma.DialogSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      user: z.boolean().optional(),
      dialogId: z.boolean().optional(),
      title: z.boolean().optional(),
      messages: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.DialogSelect>;

export const DialogFindFirstOrThrowSelectZodSchema__findFirstOrThrowDialog_schema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    dialogId: z.boolean().optional(),
    title: z.boolean().optional(),
    messages: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

export const DialogFindFirstOrThrowSchema: z.ZodType<Prisma.DialogFindFirstOrThrowArgs> = z
  .object({
    select: DialogFindFirstOrThrowSelectSchema__findFirstOrThrowDialog_schema.optional(),
    include: z.lazy(() => DialogIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        DialogOrderByWithRelationInputObjectSchema,
        DialogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DialogWhereInputObjectSchema.optional(),
    cursor: DialogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([DialogScalarFieldEnumSchema, DialogScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogFindFirstOrThrowArgs>;

export const DialogFindFirstOrThrowZodSchema = z
  .object({
    select: DialogFindFirstOrThrowSelectSchema__findFirstOrThrowDialog_schema.optional(),
    include: z.lazy(() => DialogIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        DialogOrderByWithRelationInputObjectSchema,
        DialogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DialogWhereInputObjectSchema.optional(),
    cursor: DialogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([DialogScalarFieldEnumSchema, DialogScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: findManyDialog.schema.ts

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DialogFindManySelectSchema__findManyDialog_schema: z.ZodType<Prisma.DialogSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    dialogId: z.boolean().optional(),
    title: z.boolean().optional(),
    messages: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogSelect>;

export const DialogFindManySelectZodSchema__findManyDialog_schema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    dialogId: z.boolean().optional(),
    title: z.boolean().optional(),
    messages: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

export const DialogFindManySchema: z.ZodType<Prisma.DialogFindManyArgs> = z
  .object({
    select: DialogFindManySelectSchema__findManyDialog_schema.optional(),
    include: z.lazy(() => DialogIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        DialogOrderByWithRelationInputObjectSchema,
        DialogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DialogWhereInputObjectSchema.optional(),
    cursor: DialogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([DialogScalarFieldEnumSchema, DialogScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogFindManyArgs>;

export const DialogFindManyZodSchema = z
  .object({
    select: DialogFindManySelectSchema__findManyDialog_schema.optional(),
    include: z.lazy(() => DialogIncludeObjectSchema.optional()),
    orderBy: z
      .union([
        DialogOrderByWithRelationInputObjectSchema,
        DialogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DialogWhereInputObjectSchema.optional(),
    cursor: DialogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([DialogScalarFieldEnumSchema, DialogScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

// File: countDialog.schema.ts

export const DialogCountSchema: z.ZodType<Prisma.DialogCountArgs> = z
  .object({
    orderBy: z
      .union([
        DialogOrderByWithRelationInputObjectSchema,
        DialogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DialogWhereInputObjectSchema.optional(),
    cursor: DialogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), DialogCountAggregateInputObjectSchema]).optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogCountArgs>;

export const DialogCountZodSchema = z
  .object({
    orderBy: z
      .union([
        DialogOrderByWithRelationInputObjectSchema,
        DialogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DialogWhereInputObjectSchema.optional(),
    cursor: DialogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), DialogCountAggregateInputObjectSchema]).optional(),
  })
  .strict();

// File: createOneDialog.schema.ts

export const DialogCreateOneSchema: z.ZodType<Prisma.DialogCreateArgs> = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    data: z.union([DialogCreateInputObjectSchema, DialogUncheckedCreateInputObjectSchema]),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogCreateArgs>;

export const DialogCreateOneZodSchema = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    data: z.union([DialogCreateInputObjectSchema, DialogUncheckedCreateInputObjectSchema]),
  })
  .strict();

// File: createManyDialog.schema.ts

export const DialogCreateManySchema: z.ZodType<Prisma.DialogCreateManyArgs> = z
  .object({
    data: z.union([DialogCreateManyInputObjectSchema, z.array(DialogCreateManyInputObjectSchema)]),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogCreateManyArgs>;

export const DialogCreateManyZodSchema = z
  .object({
    data: z.union([DialogCreateManyInputObjectSchema, z.array(DialogCreateManyInputObjectSchema)]),
  })
  .strict();

// File: deleteOneDialog.schema.ts

export const DialogDeleteOneSchema: z.ZodType<Prisma.DialogDeleteArgs> = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    where: DialogWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.DialogDeleteArgs>;

export const DialogDeleteOneZodSchema = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    where: DialogWhereUniqueInputObjectSchema,
  })
  .strict();

// File: deleteManyDialog.schema.ts

export const DialogDeleteManySchema: z.ZodType<Prisma.DialogDeleteManyArgs> = z
  .object({ where: DialogWhereInputObjectSchema.optional() })
  .strict() as unknown as z.ZodType<Prisma.DialogDeleteManyArgs>;

export const DialogDeleteManyZodSchema = z
  .object({ where: DialogWhereInputObjectSchema.optional() })
  .strict();

// File: updateOneDialog.schema.ts

export const DialogUpdateOneSchema: z.ZodType<Prisma.DialogUpdateArgs> = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    data: z.union([DialogUpdateInputObjectSchema, DialogUncheckedUpdateInputObjectSchema]),
    where: DialogWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.DialogUpdateArgs>;

export const DialogUpdateOneZodSchema = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    data: z.union([DialogUpdateInputObjectSchema, DialogUncheckedUpdateInputObjectSchema]),
    where: DialogWhereUniqueInputObjectSchema,
  })
  .strict();

// File: updateManyDialog.schema.ts

export const DialogUpdateManySchema: z.ZodType<Prisma.DialogUpdateManyArgs> = z
  .object({
    data: DialogUpdateManyMutationInputObjectSchema,
    where: DialogWhereInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogUpdateManyArgs>;

export const DialogUpdateManyZodSchema = z
  .object({
    data: DialogUpdateManyMutationInputObjectSchema,
    where: DialogWhereInputObjectSchema.optional(),
  })
  .strict();

// File: upsertOneDialog.schema.ts

export const DialogUpsertOneSchema: z.ZodType<Prisma.DialogUpsertArgs> = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    where: DialogWhereUniqueInputObjectSchema,
    create: z.union([DialogCreateInputObjectSchema, DialogUncheckedCreateInputObjectSchema]),
    update: z.union([DialogUpdateInputObjectSchema, DialogUncheckedUpdateInputObjectSchema]),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogUpsertArgs>;

export const DialogUpsertOneZodSchema = z
  .object({
    select: DialogSelectObjectSchema.optional(),
    include: DialogIncludeObjectSchema.optional(),
    where: DialogWhereUniqueInputObjectSchema,
    create: z.union([DialogCreateInputObjectSchema, DialogUncheckedCreateInputObjectSchema]),
    update: z.union([DialogUpdateInputObjectSchema, DialogUncheckedUpdateInputObjectSchema]),
  })
  .strict();

// File: aggregateDialog.schema.ts

export const DialogAggregateSchema: z.ZodType<Prisma.DialogAggregateArgs> = z
  .object({
    orderBy: z
      .union([
        DialogOrderByWithRelationInputObjectSchema,
        DialogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DialogWhereInputObjectSchema.optional(),
    cursor: DialogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), DialogCountAggregateInputObjectSchema]).optional(),
    _min: DialogMinAggregateInputObjectSchema.optional(),
    _max: DialogMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogAggregateArgs>;

export const DialogAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        DialogOrderByWithRelationInputObjectSchema,
        DialogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DialogWhereInputObjectSchema.optional(),
    cursor: DialogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), DialogCountAggregateInputObjectSchema]).optional(),
    _min: DialogMinAggregateInputObjectSchema.optional(),
    _max: DialogMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: groupByDialog.schema.ts

export const DialogGroupBySchema: z.ZodType<Prisma.DialogGroupByArgs> = z
  .object({
    where: DialogWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        DialogOrderByWithAggregationInputObjectSchema,
        DialogOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: DialogScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(DialogScalarFieldEnumSchema),
    _count: z.union([z.literal(true), DialogCountAggregateInputObjectSchema]).optional(),
    _min: DialogMinAggregateInputObjectSchema.optional(),
    _max: DialogMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.DialogGroupByArgs>;

export const DialogGroupByZodSchema = z
  .object({
    where: DialogWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        DialogOrderByWithAggregationInputObjectSchema,
        DialogOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: DialogScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(DialogScalarFieldEnumSchema),
    _count: z.union([z.literal(true), DialogCountAggregateInputObjectSchema]).optional(),
    _min: DialogMinAggregateInputObjectSchema.optional(),
    _max: DialogMaxAggregateInputObjectSchema.optional(),
  })
  .strict();

// File: UserFindUniqueResult.schema.ts
export const UserFindUniqueResultSchema = z.nullable(
  z.object({
    id: z.string(),
    email: z.string(),
    password: z.string().optional(),
    name: z.string(),
    oauthProviders: z.array(z.unknown()),
    resetPasswordToken: z.string().optional(),
    resetPasswordExpires: z.date().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    applications: z.array(z.unknown()),
    installs: z.array(z.unknown()),
    apiKeys: z.array(z.unknown()),
    settings: z.unknown().optional(),
    dialogs: z.array(z.unknown()),
  })
);

// File: UserFindFirstResult.schema.ts
export const UserFindFirstResultSchema = z.nullable(
  z.object({
    id: z.string(),
    email: z.string(),
    password: z.string().optional(),
    name: z.string(),
    oauthProviders: z.array(z.unknown()),
    resetPasswordToken: z.string().optional(),
    resetPasswordExpires: z.date().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    applications: z.array(z.unknown()),
    installs: z.array(z.unknown()),
    apiKeys: z.array(z.unknown()),
    settings: z.unknown().optional(),
    dialogs: z.array(z.unknown()),
  })
);

// File: UserFindManyResult.schema.ts
export const UserFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      email: z.string(),
      password: z.string().optional(),
      name: z.string(),
      oauthProviders: z.array(z.unknown()),
      resetPasswordToken: z.string().optional(),
      resetPasswordExpires: z.date().optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
      applications: z.array(z.unknown()),
      installs: z.array(z.unknown()),
      apiKeys: z.array(z.unknown()),
      settings: z.unknown().optional(),
      dialogs: z.array(z.unknown()),
    })
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// File: UserCreateResult.schema.ts
export const UserCreateResultSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string().optional(),
  name: z.string(),
  oauthProviders: z.array(z.unknown()),
  resetPasswordToken: z.string().optional(),
  resetPasswordExpires: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  applications: z.array(z.unknown()),
  installs: z.array(z.unknown()),
  apiKeys: z.array(z.unknown()),
  settings: z.unknown().optional(),
  dialogs: z.array(z.unknown()),
});

// File: UserCreateManyResult.schema.ts
export const UserCreateManyResultSchema = z.object({
  count: z.number(),
});

// File: UserUpdateResult.schema.ts
export const UserUpdateResultSchema = z.nullable(
  z.object({
    id: z.string(),
    email: z.string(),
    password: z.string().optional(),
    name: z.string(),
    oauthProviders: z.array(z.unknown()),
    resetPasswordToken: z.string().optional(),
    resetPasswordExpires: z.date().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    applications: z.array(z.unknown()),
    installs: z.array(z.unknown()),
    apiKeys: z.array(z.unknown()),
    settings: z.unknown().optional(),
    dialogs: z.array(z.unknown()),
  })
);

// File: UserUpdateManyResult.schema.ts
export const UserUpdateManyResultSchema = z.object({
  count: z.number(),
});

// File: UserUpsertResult.schema.ts
export const UserUpsertResultSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string().optional(),
  name: z.string(),
  oauthProviders: z.array(z.unknown()),
  resetPasswordToken: z.string().optional(),
  resetPasswordExpires: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  applications: z.array(z.unknown()),
  installs: z.array(z.unknown()),
  apiKeys: z.array(z.unknown()),
  settings: z.unknown().optional(),
  dialogs: z.array(z.unknown()),
});

// File: UserDeleteResult.schema.ts
export const UserDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    email: z.string(),
    password: z.string().optional(),
    name: z.string(),
    oauthProviders: z.array(z.unknown()),
    resetPasswordToken: z.string().optional(),
    resetPasswordExpires: z.date().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    applications: z.array(z.unknown()),
    installs: z.array(z.unknown()),
    apiKeys: z.array(z.unknown()),
    settings: z.unknown().optional(),
    dialogs: z.array(z.unknown()),
  })
);

// File: UserDeleteManyResult.schema.ts
export const UserDeleteManyResultSchema = z.object({
  count: z.number(),
});

// File: UserAggregateResult.schema.ts
export const UserAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      email: z.number(),
      password: z.number(),
      name: z.number(),
      oauthProviders: z.number(),
      resetPasswordToken: z.number(),
      resetPasswordExpires: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
      applications: z.number(),
      installs: z.number(),
      apiKeys: z.number(),
      settings: z.number(),
      dialogs: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      email: z.string().nullable(),
      password: z.string().nullable(),
      name: z.string().nullable(),
      resetPasswordToken: z.string().nullable(),
      resetPasswordExpires: z.date().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      email: z.string().nullable(),
      password: z.string().nullable(),
      name: z.string().nullable(),
      resetPasswordToken: z.string().nullable(),
      resetPasswordExpires: z.date().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});

// File: UserGroupByResult.schema.ts
export const UserGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
    name: z.string(),
    resetPasswordToken: z.string(),
    resetPasswordExpires: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
    _count: z
      .object({
        id: z.number(),
        email: z.number(),
        password: z.number(),
        name: z.number(),
        oauthProviders: z.number(),
        resetPasswordToken: z.number(),
        resetPasswordExpires: z.number(),
        createdAt: z.number(),
        updatedAt: z.number(),
        applications: z.number(),
        installs: z.number(),
        apiKeys: z.number(),
        settings: z.number(),
        dialogs: z.number(),
      })
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        email: z.string().nullable(),
        password: z.string().nullable(),
        name: z.string().nullable(),
        resetPasswordToken: z.string().nullable(),
        resetPasswordExpires: z.date().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        email: z.string().nullable(),
        password: z.string().nullable(),
        name: z.string().nullable(),
        resetPasswordToken: z.string().nullable(),
        resetPasswordExpires: z.date().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
  })
);

// File: UserCountResult.schema.ts
export const UserCountResultSchema = z.number();

// File: ApplicationFindUniqueResult.schema.ts
export const ApplicationFindUniqueResultSchema = z.nullable(
  z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
    version: z.string(),
    type: z.unknown(),
    description: z.string().optional(),
    status: z.unknown(),
    isPublished: z.boolean(),
    ownerId: z.string().optional(),
    owner: z.unknown().optional(),
    entryPoints: z.unknown().optional(),
    permissions: z.array(z.string()),
    storage: z.unknown().optional(),
    manifest: z.unknown().optional(),
    icon: z.string().optional(),
    versions: z.array(z.unknown()),
    userInstalls: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: ApplicationFindFirstResult.schema.ts
export const ApplicationFindFirstResultSchema = z.nullable(
  z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
    version: z.string(),
    type: z.unknown(),
    description: z.string().optional(),
    status: z.unknown(),
    isPublished: z.boolean(),
    ownerId: z.string().optional(),
    owner: z.unknown().optional(),
    entryPoints: z.unknown().optional(),
    permissions: z.array(z.string()),
    storage: z.unknown().optional(),
    manifest: z.unknown().optional(),
    icon: z.string().optional(),
    versions: z.array(z.unknown()),
    userInstalls: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: ApplicationFindManyResult.schema.ts
export const ApplicationFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      key: z.string(),
      name: z.string(),
      version: z.string(),
      type: z.unknown(),
      description: z.string().optional(),
      status: z.unknown(),
      isPublished: z.boolean(),
      ownerId: z.string().optional(),
      owner: z.unknown().optional(),
      entryPoints: z.unknown().optional(),
      permissions: z.array(z.string()),
      storage: z.unknown().optional(),
      manifest: z.unknown().optional(),
      icon: z.string().optional(),
      versions: z.array(z.unknown()),
      userInstalls: z.array(z.unknown()),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// File: ApplicationCreateResult.schema.ts
export const ApplicationCreateResultSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  version: z.string(),
  type: z.unknown(),
  description: z.string().optional(),
  status: z.unknown(),
  isPublished: z.boolean(),
  ownerId: z.string().optional(),
  owner: z.unknown().optional(),
  entryPoints: z.unknown().optional(),
  permissions: z.array(z.string()),
  storage: z.unknown().optional(),
  manifest: z.unknown().optional(),
  icon: z.string().optional(),
  versions: z.array(z.unknown()),
  userInstalls: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// File: ApplicationCreateManyResult.schema.ts
export const ApplicationCreateManyResultSchema = z.object({
  count: z.number(),
});

// File: ApplicationUpdateResult.schema.ts
export const ApplicationUpdateResultSchema = z.nullable(
  z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
    version: z.string(),
    type: z.unknown(),
    description: z.string().optional(),
    status: z.unknown(),
    isPublished: z.boolean(),
    ownerId: z.string().optional(),
    owner: z.unknown().optional(),
    entryPoints: z.unknown().optional(),
    permissions: z.array(z.string()),
    storage: z.unknown().optional(),
    manifest: z.unknown().optional(),
    icon: z.string().optional(),
    versions: z.array(z.unknown()),
    userInstalls: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: ApplicationUpdateManyResult.schema.ts
export const ApplicationUpdateManyResultSchema = z.object({
  count: z.number(),
});

// File: ApplicationUpsertResult.schema.ts
export const ApplicationUpsertResultSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  version: z.string(),
  type: z.unknown(),
  description: z.string().optional(),
  status: z.unknown(),
  isPublished: z.boolean(),
  ownerId: z.string().optional(),
  owner: z.unknown().optional(),
  entryPoints: z.unknown().optional(),
  permissions: z.array(z.string()),
  storage: z.unknown().optional(),
  manifest: z.unknown().optional(),
  icon: z.string().optional(),
  versions: z.array(z.unknown()),
  userInstalls: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// File: ApplicationDeleteResult.schema.ts
export const ApplicationDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
    version: z.string(),
    type: z.unknown(),
    description: z.string().optional(),
    status: z.unknown(),
    isPublished: z.boolean(),
    ownerId: z.string().optional(),
    owner: z.unknown().optional(),
    entryPoints: z.unknown().optional(),
    permissions: z.array(z.string()),
    storage: z.unknown().optional(),
    manifest: z.unknown().optional(),
    icon: z.string().optional(),
    versions: z.array(z.unknown()),
    userInstalls: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: ApplicationDeleteManyResult.schema.ts
export const ApplicationDeleteManyResultSchema = z.object({
  count: z.number(),
});

// File: ApplicationAggregateResult.schema.ts
export const ApplicationAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      key: z.number(),
      name: z.number(),
      version: z.number(),
      type: z.number(),
      description: z.number(),
      status: z.number(),
      isPublished: z.number(),
      ownerId: z.number(),
      owner: z.number(),
      entryPoints: z.number(),
      permissions: z.number(),
      storage: z.number(),
      manifest: z.number(),
      icon: z.number(),
      versions: z.number(),
      userInstalls: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      key: z.string().nullable(),
      name: z.string().nullable(),
      version: z.string().nullable(),
      description: z.string().nullable(),
      ownerId: z.string().nullable(),
      permissions: z.array(z.string()).nullable(),
      icon: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      key: z.string().nullable(),
      name: z.string().nullable(),
      version: z.string().nullable(),
      description: z.string().nullable(),
      ownerId: z.string().nullable(),
      permissions: z.array(z.string()).nullable(),
      icon: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});

// File: ApplicationGroupByResult.schema.ts
export const ApplicationGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
    version: z.string(),
    description: z.string(),
    isPublished: z.boolean(),
    ownerId: z.string(),
    permissions: z.array(z.string()),
    manifest: z.unknown(),
    icon: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    _count: z
      .object({
        id: z.number(),
        key: z.number(),
        name: z.number(),
        version: z.number(),
        type: z.number(),
        description: z.number(),
        status: z.number(),
        isPublished: z.number(),
        ownerId: z.number(),
        owner: z.number(),
        entryPoints: z.number(),
        permissions: z.number(),
        storage: z.number(),
        manifest: z.number(),
        icon: z.number(),
        versions: z.number(),
        userInstalls: z.number(),
        createdAt: z.number(),
        updatedAt: z.number(),
      })
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        key: z.string().nullable(),
        name: z.string().nullable(),
        version: z.string().nullable(),
        description: z.string().nullable(),
        ownerId: z.string().nullable(),
        permissions: z.array(z.string()).nullable(),
        icon: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        key: z.string().nullable(),
        name: z.string().nullable(),
        version: z.string().nullable(),
        description: z.string().nullable(),
        ownerId: z.string().nullable(),
        permissions: z.array(z.string()).nullable(),
        icon: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
  })
);

// File: ApplicationCountResult.schema.ts
export const ApplicationCountResultSchema = z.number();

// File: ApplicationVersionFindUniqueResult.schema.ts
export const ApplicationVersionFindUniqueResultSchema = z.nullable(
  z.object({
    id: z.string(),
    applicationId: z.string(),
    application: z.unknown(),
    version: z.string(),
    status: z.unknown(),
    releaseNotes: z.string().optional(),
    description: z.string().optional(),
    createdAt: z.date(),
    entryPoints: z.unknown().optional(),
    permissions: z.array(z.string()),
    storage: z.unknown().optional(),
    manifest: z.unknown().optional(),
  })
);

// File: ApplicationVersionFindFirstResult.schema.ts
export const ApplicationVersionFindFirstResultSchema = z.nullable(
  z.object({
    id: z.string(),
    applicationId: z.string(),
    application: z.unknown(),
    version: z.string(),
    status: z.unknown(),
    releaseNotes: z.string().optional(),
    description: z.string().optional(),
    createdAt: z.date(),
    entryPoints: z.unknown().optional(),
    permissions: z.array(z.string()),
    storage: z.unknown().optional(),
    manifest: z.unknown().optional(),
  })
);

// File: ApplicationVersionFindManyResult.schema.ts
export const ApplicationVersionFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      applicationId: z.string(),
      application: z.unknown(),
      version: z.string(),
      status: z.unknown(),
      releaseNotes: z.string().optional(),
      description: z.string().optional(),
      createdAt: z.date(),
      entryPoints: z.unknown().optional(),
      permissions: z.array(z.string()),
      storage: z.unknown().optional(),
      manifest: z.unknown().optional(),
    })
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// File: ApplicationVersionCreateResult.schema.ts
export const ApplicationVersionCreateResultSchema = z.object({
  id: z.string(),
  applicationId: z.string(),
  application: z.unknown(),
  version: z.string(),
  status: z.unknown(),
  releaseNotes: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.date(),
  entryPoints: z.unknown().optional(),
  permissions: z.array(z.string()),
  storage: z.unknown().optional(),
  manifest: z.unknown().optional(),
});

// File: ApplicationVersionCreateManyResult.schema.ts
export const ApplicationVersionCreateManyResultSchema = z.object({
  count: z.number(),
});

// File: ApplicationVersionUpdateResult.schema.ts
export const ApplicationVersionUpdateResultSchema = z.nullable(
  z.object({
    id: z.string(),
    applicationId: z.string(),
    application: z.unknown(),
    version: z.string(),
    status: z.unknown(),
    releaseNotes: z.string().optional(),
    description: z.string().optional(),
    createdAt: z.date(),
    entryPoints: z.unknown().optional(),
    permissions: z.array(z.string()),
    storage: z.unknown().optional(),
    manifest: z.unknown().optional(),
  })
);

// File: ApplicationVersionUpdateManyResult.schema.ts
export const ApplicationVersionUpdateManyResultSchema = z.object({
  count: z.number(),
});

// File: ApplicationVersionUpsertResult.schema.ts
export const ApplicationVersionUpsertResultSchema = z.object({
  id: z.string(),
  applicationId: z.string(),
  application: z.unknown(),
  version: z.string(),
  status: z.unknown(),
  releaseNotes: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.date(),
  entryPoints: z.unknown().optional(),
  permissions: z.array(z.string()),
  storage: z.unknown().optional(),
  manifest: z.unknown().optional(),
});

// File: ApplicationVersionDeleteResult.schema.ts
export const ApplicationVersionDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    applicationId: z.string(),
    application: z.unknown(),
    version: z.string(),
    status: z.unknown(),
    releaseNotes: z.string().optional(),
    description: z.string().optional(),
    createdAt: z.date(),
    entryPoints: z.unknown().optional(),
    permissions: z.array(z.string()),
    storage: z.unknown().optional(),
    manifest: z.unknown().optional(),
  })
);

// File: ApplicationVersionDeleteManyResult.schema.ts
export const ApplicationVersionDeleteManyResultSchema = z.object({
  count: z.number(),
});

// File: ApplicationVersionAggregateResult.schema.ts
export const ApplicationVersionAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      applicationId: z.number(),
      application: z.number(),
      version: z.number(),
      status: z.number(),
      releaseNotes: z.number(),
      description: z.number(),
      createdAt: z.number(),
      entryPoints: z.number(),
      permissions: z.number(),
      storage: z.number(),
      manifest: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      applicationId: z.string().nullable(),
      version: z.string().nullable(),
      releaseNotes: z.string().nullable(),
      description: z.string().nullable(),
      createdAt: z.date().nullable(),
      permissions: z.array(z.string()).nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      applicationId: z.string().nullable(),
      version: z.string().nullable(),
      releaseNotes: z.string().nullable(),
      description: z.string().nullable(),
      createdAt: z.date().nullable(),
      permissions: z.array(z.string()).nullable(),
    })
    .nullable()
    .optional(),
});

// File: ApplicationVersionGroupByResult.schema.ts
export const ApplicationVersionGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    applicationId: z.string(),
    version: z.string(),
    releaseNotes: z.string(),
    description: z.string(),
    createdAt: z.date(),
    permissions: z.array(z.string()),
    manifest: z.unknown(),
    _count: z
      .object({
        id: z.number(),
        applicationId: z.number(),
        application: z.number(),
        version: z.number(),
        status: z.number(),
        releaseNotes: z.number(),
        description: z.number(),
        createdAt: z.number(),
        entryPoints: z.number(),
        permissions: z.number(),
        storage: z.number(),
        manifest: z.number(),
      })
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        applicationId: z.string().nullable(),
        version: z.string().nullable(),
        releaseNotes: z.string().nullable(),
        description: z.string().nullable(),
        createdAt: z.date().nullable(),
        permissions: z.array(z.string()).nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        applicationId: z.string().nullable(),
        version: z.string().nullable(),
        releaseNotes: z.string().nullable(),
        description: z.string().nullable(),
        createdAt: z.date().nullable(),
        permissions: z.array(z.string()).nullable(),
      })
      .nullable()
      .optional(),
  })
);

// File: ApplicationVersionCountResult.schema.ts
export const ApplicationVersionCountResultSchema = z.number();

// File: UserApplicationFindUniqueResult.schema.ts
export const UserApplicationFindUniqueResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    applicationId: z.string(),
    user: z.unknown(),
    application: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: UserApplicationFindFirstResult.schema.ts
export const UserApplicationFindFirstResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    applicationId: z.string(),
    user: z.unknown(),
    application: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: UserApplicationFindManyResult.schema.ts
export const UserApplicationFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      applicationId: z.string(),
      user: z.unknown(),
      application: z.unknown(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// File: UserApplicationCreateResult.schema.ts
export const UserApplicationCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  applicationId: z.string(),
  user: z.unknown(),
  application: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// File: UserApplicationCreateManyResult.schema.ts
export const UserApplicationCreateManyResultSchema = z.object({
  count: z.number(),
});

// File: UserApplicationUpdateResult.schema.ts
export const UserApplicationUpdateResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    applicationId: z.string(),
    user: z.unknown(),
    application: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: UserApplicationUpdateManyResult.schema.ts
export const UserApplicationUpdateManyResultSchema = z.object({
  count: z.number(),
});

// File: UserApplicationUpsertResult.schema.ts
export const UserApplicationUpsertResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  applicationId: z.string(),
  user: z.unknown(),
  application: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// File: UserApplicationDeleteResult.schema.ts
export const UserApplicationDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    applicationId: z.string(),
    user: z.unknown(),
    application: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: UserApplicationDeleteManyResult.schema.ts
export const UserApplicationDeleteManyResultSchema = z.object({
  count: z.number(),
});

// File: UserApplicationAggregateResult.schema.ts
export const UserApplicationAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      userId: z.number(),
      applicationId: z.number(),
      user: z.number(),
      application: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      applicationId: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      applicationId: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});

// File: UserApplicationGroupByResult.schema.ts
export const UserApplicationGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    applicationId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    _count: z
      .object({
        id: z.number(),
        userId: z.number(),
        applicationId: z.number(),
        user: z.number(),
        application: z.number(),
        createdAt: z.number(),
        updatedAt: z.number(),
      })
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        applicationId: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        applicationId: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
  })
);

// File: UserApplicationCountResult.schema.ts
export const UserApplicationCountResultSchema = z.number();

// File: ApiKeyFindUniqueResult.schema.ts
export const ApiKeyFindUniqueResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    provider: z.string(),
    encryptedKey: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: ApiKeyFindFirstResult.schema.ts
export const ApiKeyFindFirstResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    provider: z.string(),
    encryptedKey: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: ApiKeyFindManyResult.schema.ts
export const ApiKeyFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      user: z.unknown(),
      provider: z.string(),
      encryptedKey: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// File: ApiKeyCreateResult.schema.ts
export const ApiKeyCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  provider: z.string(),
  encryptedKey: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// File: ApiKeyCreateManyResult.schema.ts
export const ApiKeyCreateManyResultSchema = z.object({
  count: z.number(),
});

// File: ApiKeyUpdateResult.schema.ts
export const ApiKeyUpdateResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    provider: z.string(),
    encryptedKey: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: ApiKeyUpdateManyResult.schema.ts
export const ApiKeyUpdateManyResultSchema = z.object({
  count: z.number(),
});

// File: ApiKeyUpsertResult.schema.ts
export const ApiKeyUpsertResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  provider: z.string(),
  encryptedKey: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// File: ApiKeyDeleteResult.schema.ts
export const ApiKeyDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    provider: z.string(),
    encryptedKey: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: ApiKeyDeleteManyResult.schema.ts
export const ApiKeyDeleteManyResultSchema = z.object({
  count: z.number(),
});

// File: ApiKeyAggregateResult.schema.ts
export const ApiKeyAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      userId: z.number(),
      user: z.number(),
      provider: z.number(),
      encryptedKey: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      provider: z.string().nullable(),
      encryptedKey: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      provider: z.string().nullable(),
      encryptedKey: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});

// File: ApiKeyGroupByResult.schema.ts
export const ApiKeyGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    provider: z.string(),
    encryptedKey: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    _count: z
      .object({
        id: z.number(),
        userId: z.number(),
        user: z.number(),
        provider: z.number(),
        encryptedKey: z.number(),
        createdAt: z.number(),
        updatedAt: z.number(),
      })
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        provider: z.string().nullable(),
        encryptedKey: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        provider: z.string().nullable(),
        encryptedKey: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
  })
);

// File: ApiKeyCountResult.schema.ts
export const ApiKeyCountResultSchema = z.number();

// File: SettingsFindUniqueResult.schema.ts
export const SettingsFindUniqueResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    volume: z.number().int(),
    language: z.unknown(),
    theme: z.unknown(),
    accentColorLight: z.string(),
    accentColorDark: z.string(),
    sttProviderName: z.string().optional(),
    llmProviderName: z.string().optional(),
    llmModel: z.string().optional(),
    ttsProviderName: z.string().optional(),
    welcomeTitle: z.string(),
    idleTimeoutSeconds: z.number().int(),
    idleMode: z.unknown(),
    idleCustomImagePath: z.string(),
    idleRemoteEndpoint: z.string(),
    modelScene: z.unknown().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: SettingsFindFirstResult.schema.ts
export const SettingsFindFirstResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    volume: z.number().int(),
    language: z.unknown(),
    theme: z.unknown(),
    accentColorLight: z.string(),
    accentColorDark: z.string(),
    sttProviderName: z.string().optional(),
    llmProviderName: z.string().optional(),
    llmModel: z.string().optional(),
    ttsProviderName: z.string().optional(),
    welcomeTitle: z.string(),
    idleTimeoutSeconds: z.number().int(),
    idleMode: z.unknown(),
    idleCustomImagePath: z.string(),
    idleRemoteEndpoint: z.string(),
    modelScene: z.unknown().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: SettingsFindManyResult.schema.ts
export const SettingsFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      user: z.unknown(),
      volume: z.number().int(),
      language: z.unknown(),
      theme: z.unknown(),
      accentColorLight: z.string(),
      accentColorDark: z.string(),
      sttProviderName: z.string().optional(),
      llmProviderName: z.string().optional(),
      llmModel: z.string().optional(),
      ttsProviderName: z.string().optional(),
      welcomeTitle: z.string(),
      idleTimeoutSeconds: z.number().int(),
      idleMode: z.unknown(),
      idleCustomImagePath: z.string(),
      idleRemoteEndpoint: z.string(),
      modelScene: z.unknown().optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// File: SettingsCreateResult.schema.ts
export const SettingsCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  volume: z.number().int(),
  language: z.unknown(),
  theme: z.unknown(),
  accentColorLight: z.string(),
  accentColorDark: z.string(),
  sttProviderName: z.string().optional(),
  llmProviderName: z.string().optional(),
  llmModel: z.string().optional(),
  ttsProviderName: z.string().optional(),
  welcomeTitle: z.string(),
  idleTimeoutSeconds: z.number().int(),
  idleMode: z.unknown(),
  idleCustomImagePath: z.string(),
  idleRemoteEndpoint: z.string(),
  modelScene: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// File: SettingsCreateManyResult.schema.ts
export const SettingsCreateManyResultSchema = z.object({
  count: z.number(),
});

// File: SettingsUpdateResult.schema.ts
export const SettingsUpdateResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    volume: z.number().int(),
    language: z.unknown(),
    theme: z.unknown(),
    accentColorLight: z.string(),
    accentColorDark: z.string(),
    sttProviderName: z.string().optional(),
    llmProviderName: z.string().optional(),
    llmModel: z.string().optional(),
    ttsProviderName: z.string().optional(),
    welcomeTitle: z.string(),
    idleTimeoutSeconds: z.number().int(),
    idleMode: z.unknown(),
    idleCustomImagePath: z.string(),
    idleRemoteEndpoint: z.string(),
    modelScene: z.unknown().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: SettingsUpdateManyResult.schema.ts
export const SettingsUpdateManyResultSchema = z.object({
  count: z.number(),
});

// File: SettingsUpsertResult.schema.ts
export const SettingsUpsertResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  volume: z.number().int(),
  language: z.unknown(),
  theme: z.unknown(),
  accentColorLight: z.string(),
  accentColorDark: z.string(),
  sttProviderName: z.string().optional(),
  llmProviderName: z.string().optional(),
  llmModel: z.string().optional(),
  ttsProviderName: z.string().optional(),
  welcomeTitle: z.string(),
  idleTimeoutSeconds: z.number().int(),
  idleMode: z.unknown(),
  idleCustomImagePath: z.string(),
  idleRemoteEndpoint: z.string(),
  modelScene: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// File: SettingsDeleteResult.schema.ts
export const SettingsDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    volume: z.number().int(),
    language: z.unknown(),
    theme: z.unknown(),
    accentColorLight: z.string(),
    accentColorDark: z.string(),
    sttProviderName: z.string().optional(),
    llmProviderName: z.string().optional(),
    llmModel: z.string().optional(),
    ttsProviderName: z.string().optional(),
    welcomeTitle: z.string(),
    idleTimeoutSeconds: z.number().int(),
    idleMode: z.unknown(),
    idleCustomImagePath: z.string(),
    idleRemoteEndpoint: z.string(),
    modelScene: z.unknown().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: SettingsDeleteManyResult.schema.ts
export const SettingsDeleteManyResultSchema = z.object({
  count: z.number(),
});

// File: SettingsAggregateResult.schema.ts
export const SettingsAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      userId: z.number(),
      user: z.number(),
      volume: z.number(),
      language: z.number(),
      theme: z.number(),
      accentColorLight: z.number(),
      accentColorDark: z.number(),
      sttProviderName: z.number(),
      llmProviderName: z.number(),
      llmModel: z.number(),
      ttsProviderName: z.number(),
      welcomeTitle: z.number(),
      idleTimeoutSeconds: z.number(),
      idleMode: z.number(),
      idleCustomImagePath: z.number(),
      idleRemoteEndpoint: z.number(),
      modelScene: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
    })
    .optional(),
  _sum: z
    .object({
      volume: z.number().nullable(),
      idleTimeoutSeconds: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _avg: z
    .object({
      volume: z.number().nullable(),
      idleTimeoutSeconds: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      volume: z.number().int().nullable(),
      accentColorLight: z.string().nullable(),
      accentColorDark: z.string().nullable(),
      sttProviderName: z.string().nullable(),
      llmProviderName: z.string().nullable(),
      llmModel: z.string().nullable(),
      ttsProviderName: z.string().nullable(),
      welcomeTitle: z.string().nullable(),
      idleTimeoutSeconds: z.number().int().nullable(),
      idleCustomImagePath: z.string().nullable(),
      idleRemoteEndpoint: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      volume: z.number().int().nullable(),
      accentColorLight: z.string().nullable(),
      accentColorDark: z.string().nullable(),
      sttProviderName: z.string().nullable(),
      llmProviderName: z.string().nullable(),
      llmModel: z.string().nullable(),
      ttsProviderName: z.string().nullable(),
      welcomeTitle: z.string().nullable(),
      idleTimeoutSeconds: z.number().int().nullable(),
      idleCustomImagePath: z.string().nullable(),
      idleRemoteEndpoint: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});

// File: SettingsGroupByResult.schema.ts
export const SettingsGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    volume: z.number().int(),
    accentColorLight: z.string(),
    accentColorDark: z.string(),
    sttProviderName: z.string(),
    llmProviderName: z.string(),
    llmModel: z.string(),
    ttsProviderName: z.string(),
    welcomeTitle: z.string(),
    idleTimeoutSeconds: z.number().int(),
    idleCustomImagePath: z.string(),
    idleRemoteEndpoint: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    _count: z
      .object({
        id: z.number(),
        userId: z.number(),
        user: z.number(),
        volume: z.number(),
        language: z.number(),
        theme: z.number(),
        accentColorLight: z.number(),
        accentColorDark: z.number(),
        sttProviderName: z.number(),
        llmProviderName: z.number(),
        llmModel: z.number(),
        ttsProviderName: z.number(),
        welcomeTitle: z.number(),
        idleTimeoutSeconds: z.number(),
        idleMode: z.number(),
        idleCustomImagePath: z.number(),
        idleRemoteEndpoint: z.number(),
        modelScene: z.number(),
        createdAt: z.number(),
        updatedAt: z.number(),
      })
      .optional(),
    _sum: z
      .object({
        volume: z.number().nullable(),
        idleTimeoutSeconds: z.number().nullable(),
      })
      .nullable()
      .optional(),
    _avg: z
      .object({
        volume: z.number().nullable(),
        idleTimeoutSeconds: z.number().nullable(),
      })
      .nullable()
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        volume: z.number().int().nullable(),
        accentColorLight: z.string().nullable(),
        accentColorDark: z.string().nullable(),
        sttProviderName: z.string().nullable(),
        llmProviderName: z.string().nullable(),
        llmModel: z.string().nullable(),
        ttsProviderName: z.string().nullable(),
        welcomeTitle: z.string().nullable(),
        idleTimeoutSeconds: z.number().int().nullable(),
        idleCustomImagePath: z.string().nullable(),
        idleRemoteEndpoint: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        volume: z.number().int().nullable(),
        accentColorLight: z.string().nullable(),
        accentColorDark: z.string().nullable(),
        sttProviderName: z.string().nullable(),
        llmProviderName: z.string().nullable(),
        llmModel: z.string().nullable(),
        ttsProviderName: z.string().nullable(),
        welcomeTitle: z.string().nullable(),
        idleTimeoutSeconds: z.number().int().nullable(),
        idleCustomImagePath: z.string().nullable(),
        idleRemoteEndpoint: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
  })
);

// File: SettingsCountResult.schema.ts
export const SettingsCountResultSchema = z.number();

// File: DialogFindUniqueResult.schema.ts
export const DialogFindUniqueResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    dialogId: z.string(),
    title: z.string(),
    messages: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: DialogFindFirstResult.schema.ts
export const DialogFindFirstResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    dialogId: z.string(),
    title: z.string(),
    messages: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: DialogFindManyResult.schema.ts
export const DialogFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      user: z.unknown(),
      dialogId: z.string(),
      title: z.string(),
      messages: z.array(z.unknown()),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// File: DialogCreateResult.schema.ts
export const DialogCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  dialogId: z.string(),
  title: z.string(),
  messages: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// File: DialogCreateManyResult.schema.ts
export const DialogCreateManyResultSchema = z.object({
  count: z.number(),
});

// File: DialogUpdateResult.schema.ts
export const DialogUpdateResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    dialogId: z.string(),
    title: z.string(),
    messages: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: DialogUpdateManyResult.schema.ts
export const DialogUpdateManyResultSchema = z.object({
  count: z.number(),
});

// File: DialogUpsertResult.schema.ts
export const DialogUpsertResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  dialogId: z.string(),
  title: z.string(),
  messages: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// File: DialogDeleteResult.schema.ts
export const DialogDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    dialogId: z.string(),
    title: z.string(),
    messages: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

// File: DialogDeleteManyResult.schema.ts
export const DialogDeleteManyResultSchema = z.object({
  count: z.number(),
});

// File: DialogAggregateResult.schema.ts
export const DialogAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      userId: z.number(),
      user: z.number(),
      dialogId: z.number(),
      title: z.number(),
      messages: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      dialogId: z.string().nullable(),
      title: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      dialogId: z.string().nullable(),
      title: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});

// File: DialogGroupByResult.schema.ts
export const DialogGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    dialogId: z.string(),
    title: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    _count: z
      .object({
        id: z.number(),
        userId: z.number(),
        user: z.number(),
        dialogId: z.number(),
        title: z.number(),
        messages: z.number(),
        createdAt: z.number(),
        updatedAt: z.number(),
      })
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        dialogId: z.string().nullable(),
        title: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        dialogId: z.string().nullable(),
        title: z.string().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
  })
);

// File: DialogCountResult.schema.ts
export const DialogCountResultSchema = z.number();

// File: index.ts

// File: index.ts
