import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function DocGenerator() {
  const [featureName, setFeatureName] = useState("");
  const [image, setImage] = useState(null);
  const [markdownOutput, setMarkdownOutput] = useState("");

  const generateMarkdown = () => {
    if (!featureName) return;

    const mdTemplate = `# ${featureName}

### 📝 Introduction
-------------------------------------------
Tính năng **${featureName}** cho phép quản lý và sử dụng hiệu quả.

### 🛠️ Usage
----------------------------------------
![Interface](${image ? URL.createObjectURL(image) : "#"}){.img-fluid}

#### 🏷️ Data Fields

:::{.alert .alert-info .mx-3 }
| Thành phần | Mô tả |
|------------|-------|
| **Example Field** | Mô tả field |
:::

#### 🔧 Commands

:::{.alert .alert-info .mx-3 }
- **Refresh**: Cập nhật dữ liệu
- **New**: Tạo mới dữ liệu
- **Edit**: Chỉnh sửa dữ liệu
- **Delete**: Xóa dữ liệu
:::
`;
    setMarkdownOutput(mdTemplate);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-4 space-y-4">
          <Input
            placeholder="Enter feature name"
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <Upload size={16} />
            <span>Upload Interface Image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <Button onClick={generateMarkdown}>Generate Markdown</Button>
        </CardContent>
      </Card>

      {markdownOutput && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <Textarea value={markdownOutput} rows={10} readOnly />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
