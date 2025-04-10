
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يحتوي على حرفين على الأقل" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  subject: z.string().min(5, { message: "الموضوع يجب أن يحتوي على 5 أحرف على الأقل" }),
  message: z.string().min(10, { message: "الرسالة يجب أن تحتوي على 10 أحرف على الأقل" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    // Simulate form submission
    console.log(data);
    toast({
      title: "تم إرسال رسالتك",
      description: "سنقوم بالرد عليك في أقرب وقت ممكن.",
    });
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">اتصل بنا</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        لديك سؤال أو اقتراح؟ نحن هنا للمساعدة. يمكنك التواصل معنا عبر النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن.
      </p>
      
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسمك" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input placeholder="example@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الموضوع</FormLabel>
                      <FormControl>
                        <Input placeholder="موضوع الرسالة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الرسالة</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="اكتب رسالتك هنا..." 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">إرسال الرسالة</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">طلب تعليق صوتي لمباراة محددة</h2>
          <p className="text-gray-600 mb-4">
            هل تحتاج إلى تعليق صوتي لمباراة معينة؟ يمكنك طلب ذلك من خلال ملء النموذج أعلاه وتحديد المباراة التي ترغب في الحصول على تعليق صوتي لها.
          </p>
          <p className="text-gray-600">
            سيقوم فريقنا بالتواصل معك لمناقشة التفاصيل والتكلفة إذا كانت هناك حاجة لذلك.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
