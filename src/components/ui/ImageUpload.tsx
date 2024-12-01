import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled = false,
}: ImageUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    disabled,
  });

  return (
    <div className="space-y-1 w-full">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-4 
          flex items-center justify-center 
          ${
            !disabled
              ? 'hover:bg-gray-50 cursor-pointer'
              : 'cursor-not-allowed opacity-70'
          } 
          transition
        `}
      >
        <input {...getInputProps()} disabled={disabled} />
        {value ? (
          <div className="relative w-[100px] h-[100px]">
            <img
              alt="Upload"
              className="object-cover rounded-lg w-full h-full"
              src={value}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <Icon icon="solar:upload-linear" className="h-10 w-10" />
            <div className="text-sm text-muted-foreground">
              {disabled
                ? 'Image upload disabled'
                : 'Drag & drop or click to upload'}
            </div>
          </div>
        )}
      </div>
      {value && !disabled && (
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => onChange('')}
            type="button"
            variant="destructive"
            size="sm"
          >
            Remove Image
          </Button>
        </div>
      )}
    </div>
  );
};
