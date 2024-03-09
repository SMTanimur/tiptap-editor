"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { defaultEditorContent } from "./wysiwyg/default-content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem,  FormMessage } from "../ui/form";
import protectedEditorConfig from "~/configs/protected-editor-config";
import WysiwygEditor from "./wysiwyg/wysiwyg-editor";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

export const dynamic = "force-dynamic";
export const postEditFormSchema = z.object({
  description: z.string().optional(),
  content: z.any().optional(),
});
type FormData = z.infer<typeof postEditFormSchema>;

interface EditorProps {
 
}

type EditorFormValues = z.infer<typeof postEditFormSchema>;

const Editor: FC<EditorProps> = ({

}) => {
  const router = useRouter();


  // States
  const [isSaving, setIsSaving] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState<boolean>(false);
  const [content, setContent] = useState<string | null>( null);

  // Uppy instance for cover photo upload

  

  // Default values for the form
  const defaultValues: Partial<EditorFormValues> = {
    
    content: content ?? protectedEditorConfig.placeholderContent,
  };

  const form = useForm<EditorFormValues>({
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: EditorFormValues) {
    setShowLoadingAlert(true);
    setIsSaving(true);

  

    setIsSaving(false);
    setShowLoadingAlert(false);
  }

  return (
    <>
      <Form {...form}>
        {/* Title */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         

        


         

          {/* Short Description */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>
                {protectedEditorConfig.shortDescriptionTitle}
              </CardTitle>
              <CardDescription>
                {protectedEditorConfig.shortDescriptionDescription}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={
                          protectedEditorConfig.placeholderDescription
                        }
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <WysiwygEditor
            defaultValue={content ? JSON.parse(content) : defaultEditorContent}
            onDebouncedUpdate={(editor) => {
              setContent(JSON.stringify(editor?.getJSON()));
            }}
          />

          <div className="infline-flex flex items-center justify-start space-x-3">
            <Button
              type="submit"
              className="flex !bg-gray-900 px-10 !text-white hover:!bg-gray-800"
              disabled={isSaving}
            >
              {protectedEditorConfig.submit}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              className="flex !bg-gray-100 px-10 !text-gray-900 hover:!bg-gray-200"
              disabled={isSaving}
            >
              {protectedEditorConfig.cancel}
            </Button>
          </div>
        </form>
      </Form>
     
    </>
  );
};

export default Editor;
