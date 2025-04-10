
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">من نحن</h1>
        
        <Card className="mb-10">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">عن مبصر</h2>
            <p className="mb-4">
              مبصر هي منصة ذكية تهدف إلى تمكين المكفوفين وضعاف البصر من الاستمتاع بمباريات كرة القدم من خلال تحويل الفيديو إلى تعليق صوتي عربي حي باستخدام الذكاء الاصطناعي.
            </p>
            <p className="mb-4">
              نؤمن بأن الإعاقة البصرية لا يجب أن تكون عائقًا أمام متعة متابعة رياضة كرة القدم. لذلك قمنا بتطوير تقنية متقدمة تعتمد على الذكاء الاصطناعي لتحليل مقاطع الفيديو واستخراج الأحداث المهمة في المباريات وتحويلها إلى تعليق صوتي احترافي باللغة العربية.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-10">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">رسالتنا</h2>
            <div className="bg-primary/5 p-4 rounded-md mb-4">
              <p className="text-lg font-semibold text-primary text-center">
                "نحو تجربة رياضية كاملة للجميع"
              </p>
            </div>
            <p>
              نسعى لتوفير تجربة مشاهدة عادلة وممتعة للمكفوفين وضعاف البصر في جميع أنحاء الوطن العربي، وتمكينهم من الاستمتاع بمباريات كرة القدم والمشاركة في شغف هذه الرياضة الشعبية، من خلال تقديم تقنية سهلة الاستخدام ومتاحة للجميع.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-10">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">رؤيتنا</h2>
            <div className="bg-primary/5 p-4 rounded-md mb-4">
              <p className="text-lg font-semibold text-primary text-center">
                "توفير فرص مشاهدة عادلة للمكفوفين في جميع أنحاء الوطن العربي"
              </p>
            </div>
            <p>
              نتطلع إلى بناء عالم رقمي أكثر شمولًا، حيث يمكن للأشخاص ذوي الإعاقة البصرية الاستمتاع بتجارب رياضية ثرية وتفاعلية. نعمل على تطوير تقنيتنا باستمرار لتشمل المزيد من الألعاب الرياضية والفعاليات، وجعلها متاحة لأكبر عدد ممكن من المستخدمين في مختلف أنحاء العالم العربي.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">فريق العمل</h2>
            <p className="mb-4">
              مبصر هو نتاج جهود فريق متعدد التخصصات من المطورين والمهندسين والخبراء في مجالات الذكاء الاصطناعي وتحليل الفيديو وتقنيات الصوت، بالإضافة إلى خبراء في مجال إمكانية الوصول والشمولية الرقمية.
            </p>
            <p>
              نحن ملتزمون بالاستماع إلى ملاحظات المستخدمين وتطوير منصتنا باستمرار لتلبية احتياجاتهم وتوقعاتهم. إذا كان لديك أي اقتراح أو ملاحظة، فلا تتردد في التواصل معنا.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
