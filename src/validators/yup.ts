import * as yup from 'yup';

import { buildYup } from 'schema-to-yup';
import { CustomFields, SchemaShape } from '~/types';


const documentShape = {
  title: yup.string().required('Title is required.'),
  publishedAt: yup.date().required('Date is required.'),
  content: yup.string().required('Content is required.'),
  status: yup
    .string()
    .equals(['published', 'draft'])
    .required('Status is missing.'),

  description: yup.string(),
  coverImage: yup.string()
}

export const editDocumentSchema: yup.Schema<SchemaShape> = yup
  .object()
  .shape(documentShape)

export const convertSchemaToYup = (customFields: {
  properties: CustomFields
}) => {
  const shape: SchemaShape = {}

  Object.entries(customFields.properties).map(([name, fields]) => {
    shape[name] = { ...customFields.properties[name], type: fields.dataType }
  })

  const yupSchema = buildYup({
    type: 'object',
    properties: { ...documentShape, ...shape }
  })
  return yupSchema
}
