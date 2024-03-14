"use client"
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Editor from "~/components/Editor/Editor";
import { useEditor } from '~/hooks/useEditor';
import { Document } from '~/types/Document';
import { editDocumentSchema } from "~/validators/yup";




export default function Home() {
  const [documentSchema, setDocumentSchema] = useState(editDocumentSchema)
  const methods = useForm<Document>()
  const { editor } = useEditor({ ...methods })
  return (
    <div className="container px-10 min-h-screen flex justify-center items-center">
            <FormProvider {...methods}>
            <Editor editor={editor} id="content"/>
            </FormProvider>
        </div>
  );
}
