import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useUploadPlan } from '../hooks/useQueries';
import PageLayout from '../components/layout/PageLayout';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Brain } from 'lucide-react';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

export default function PlanUploadPage() {
  const navigate = useNavigate();
  const uploadPlan = useUploadPlan();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setUploadComplete(false);
      } else {
        toast.error('Please select a PDF file');
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setUploadProgress(0);

    try {
      // Convert file to bytes
      const arrayBuffer = await selectedFile.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      // Create ExternalBlob with progress tracking
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      // Upload to backend
      await uploadPlan.mutateAsync(blob);

      setUploadComplete(true);
      toast.success('Plan uploaded successfully!');

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate({ to: '/dashboard' });
      }, 2000);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload plan. Please try again.');
      setUploadProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PageLayout title="Upload NDIS Plan">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-3xl shadow-layer-2 p-12 border border-border">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-success/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Upload Your NDIS Plan
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload your plan document and our AI will extract key information
            </p>
          </div>

          {!uploadComplete ? (
            <>
              {/* File Upload Area */}
              <div
                className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all ${
                  selectedFile
                    ? 'border-primary bg-primary/5'
                    : 'border-input hover:border-primary hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent'
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  disabled={isProcessing}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer block"
                >
                  <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
                  {selectedFile ? (
                    <>
                      <p className="text-lg font-semibold text-foreground mb-2">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-semibold text-foreground mb-2">
                        Drop your PDF here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF files up to 10MB
                      </p>
                    </>
                  )}
                </label>
              </div>

              {/* Upload Progress */}
              {isProcessing && (
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Upload Progress</span>
                    <span className="text-foreground font-semibold">{uploadProgress}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden shadow-sm">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-300 shadow-sm"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>

                  {uploadProgress === 100 && (
                    <div className="flex items-center justify-center gap-3 p-6 bg-primary/10 rounded-xl border border-primary/20">
                      <Brain className="w-6 h-6 text-primary animate-pulse" />
                      <p className="text-foreground font-medium">
                        Processing your plan with AI...
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Upload Button */}
              {selectedFile && !isProcessing && (
                <button
                  onClick={handleUpload}
                  className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-primary to-success text-primary-foreground rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all"
                >
                  Upload Plan
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Upload Complete!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your plan has been successfully uploaded and processed
              </p>
              <button
                onClick={() => navigate({ to: '/dashboard' })}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:shadow-md transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
