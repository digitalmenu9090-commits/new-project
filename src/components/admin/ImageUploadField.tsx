import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  Check,
  Link as LinkIcon,
  Sparkles,
  RefreshCw,
  Camera,
} from 'lucide-react';

interface ImageUploadFieldProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

const PRESET_CAFE_IMAGES = [
  {
    name: 'Espresso / Flat White',
    url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Iced Latte / Cold Brew',
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Artisan Pour Over',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Steamed Momo Plate',
    url: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Fresh Bakery Croissant',
    url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Special Himalayan Tea',
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
  },
];

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label = 'Item Image',
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress & resize image to maintain crisp quality while keeping data size under 80KB
  const processAndOptimizeImage = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setUploadError(null);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        try {
          const maxDimension = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            // Fallback to original read result if canvas context unavailable
            onChange(readerEvent.target?.result as string);
            setIsProcessing(false);
            return;
          }

          // Smooth image interpolation
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Export as optimized JPEG
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.84);
          onChange(optimizedDataUrl);
          setIsProcessing(false);
        } catch (err) {
          console.error('Error optimizing image:', err);
          // Fallback to raw data url
          onChange(readerEvent.target?.result as string);
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        setUploadError('Could not load image file. Please try another image.');
        setIsProcessing(false);
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = () => {
      setUploadError('Failed to read file from disk.');
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndOptimizeImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAndOptimizeImage(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-stone-700">
          {label}
        </label>

        {/* Mode switcher tabs */}
        <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg text-[11px] font-semibold text-stone-600">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2 py-1 rounded-md transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'hover:text-stone-900'
            }`}
          >
            Upload Image
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2 py-1 rounded-md transition-all ${
              activeTab === 'url'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'hover:text-stone-900'
            }`}
          >
            Image Link
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-2 py-1 rounded-md transition-all ${
              activeTab === 'presets'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'hover:text-stone-900'
            }`}
          >
            Presets
          </button>
        </div>
      </div>

      {/* Main Upload Zone */}
      {activeTab === 'upload' && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
              isDragging
                ? 'border-[#C89D5C] bg-[#FAF3E8]/80 scale-[1.01]'
                : 'border-stone-200 hover:border-[#C89D5C] bg-stone-50/70 hover:bg-stone-50'
            }`}
          >
            {isProcessing ? (
              <div className="py-3 flex flex-col items-center gap-2">
                <RefreshCw className="w-7 h-7 text-[#C89D5C] animate-spin" />
                <span className="text-xs font-semibold text-stone-600">
                  Optimizing & Preparing Photo...
                </span>
              </div>
            ) : (
              <>
                <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-stone-200 flex items-center justify-center text-[#C89D5C]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800">
                    <span className="text-[#C89D5C] underline underline-offset-2">
                      Click to upload
                    </span>{' '}
                    or drag & drop photo
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Supports JPG, PNG, WebP (auto-optimized for fast loading)
                  </p>
                </div>
              </>
            )}
          </div>

          {uploadError && (
            <p className="text-xs text-rose-600 font-medium">{uploadError}</p>
          )}
        </div>
      )}

      {/* URL Input Mode */}
      {activeTab === 'url' && (
        <div className="space-y-1">
          <div className="relative">
            <LinkIcon className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden bg-white"
            />
          </div>
          <p className="text-[11px] text-stone-400">
            Paste any direct image URL from Unsplash, Google Drive, or your hosting CDN.
          </p>
        </div>
      )}

      {/* Preset Curated Images Mode */}
      {activeTab === 'presets' && (
        <div className="space-y-1.5">
          <div className="grid grid-cols-3 gap-2">
            {PRESET_CAFE_IMAGES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(preset.url)}
                className={`group relative rounded-xl overflow-hidden border text-left p-1 transition-all ${
                  value === preset.url
                    ? 'border-[#C89D5C] ring-2 ring-[#C89D5C]/30'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <img
                  src={preset.url}
                  alt={preset.name}
                  className="w-full h-14 object-cover rounded-lg"
                />
                <span className="block text-[10px] font-bold text-stone-700 truncate mt-1">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Preview & Actions */}
      {value && (
        <div className="p-2.5 bg-stone-100/80 rounded-2xl border border-stone-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={value}
              alt="Selected preview"
              className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0 bg-white"
            />
            <div className="min-w-0">
              <span className="text-xs font-bold text-stone-800 block truncate">
                Active Item Photo
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                Ready to publish
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 text-[11px] font-bold text-stone-700 transition-colors cursor-pointer"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
