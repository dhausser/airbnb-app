/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as PrismaClient from '.prisma/client'

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {}

export interface NexusGenRootTypes {
  Mutation: {}
  Post: PrismaClient.Post
  Profile: PrismaClient.Profile
  Query: {}
  User: PrismaClient.User
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenAllTypes extends NexusGenRootTypes {}

export interface NexusGenFieldTypes {
  Mutation: {
    // field return type
    createDraft: NexusGenRootTypes['Post'] // Post!
    signupUser: NexusGenRootTypes['User'] // User!
  }
  Post: {
    // field return type
    author: NexusGenRootTypes['User'] | null // User
    content: string | null // String
    id: string // ID!
    title: string // String!
  }
  Profile: {
    // field return type
    bio: string | null // String
    id: string // ID!
    published: boolean // Boolean!
    user: NexusGenRootTypes['User'] | null // User
    userId: string | null // String
  }
  Query: {
    // field return type
    post: NexusGenRootTypes['Post'] // Post!
    posts: NexusGenRootTypes['Post'][] // [Post!]!
    profiles: NexusGenRootTypes['Profile'][] // [Profile!]!
    users: NexusGenRootTypes['User'][] // [User!]!
  }
  User: {
    // field return type
    email: string // String!
    id: string // ID!
    name: string | null // String
    posts: NexusGenRootTypes['Post'][] | null // [Post!]
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createDraft: {
      // args
      authorEmail?: string | null // String
      content?: string | null // String
      title: string // String!
    }
    signupUser: {
      // args
      email: string // String!
      name?: string | null // String
    }
  }
  Query: {
    post: {
      // args
      id?: string | null // ID
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames =
  | 'Mutation'
  | 'Post'
  | 'Profile'
  | 'Query'
  | 'User'

export type NexusGenInputNames = never

export type NexusGenEnumNames = never

export type NexusGenInterfaceNames = never

export type NexusGenScalarNames = 'Boolean' | 'Float' | 'ID' | 'Int' | 'String'

export type NexusGenUnionNames = never

export interface NexusGenTypes {
  context: { prisma: PrismaClient.PrismaClient }
  inputTypes: NexusGenInputs
  rootTypes: NexusGenRootTypes
  argTypes: NexusGenArgTypes
  fieldTypes: NexusGenFieldTypes
  allTypes: NexusGenAllTypes
  inheritedFields: NexusGenInheritedFields
  objectNames: NexusGenObjectNames
  inputNames: NexusGenInputNames
  enumNames: NexusGenEnumNames
  interfaceNames: NexusGenInterfaceNames
  scalarNames: NexusGenScalarNames
  unionNames: NexusGenUnionNames
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames']
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames']
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames']
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginSchemaConfig {}
}
