import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Building2, QrCode, History } from "lucide-react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const companySchema = z.object({
  companyName: z.string().optional(),
  industry: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  product: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

export default function CompanyDetails() {
  const [, setLocation] = useLocation();

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      industry: "",
      phone: "",
      email: "",
      website: "",
      product: "",
      city: "",
      country: "",
    },
  });

  const handleBack = () => {
    setLocation("/all-products");
  };

  const handleGenerate = () => {
    setLocation("/generate");
  };

  const handleHistory = () => {
    setLocation("/dashboard");
  };

  const handleGoToProfile = () => {
    setLocation("/profile");
  };

  const onSubmit = (data: CompanyFormData) => {
    console.log("Company data:", data);
    // Here you would typically save the data to your backend
    // For now, just go back to all products
    setLocation("/all-products");
  };

  return (
    <div className="gradient-bg min-h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center shadow-lg">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="w-full h-full p-0 hover:bg-transparent text-black"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <h1 className="text-black text-xl font-bold">Warante</h1>
        <div className="w-10 h-10"></div> {/* Spacer for centering */}
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6 pb-8">
        {/* Form Panel */}
        <div className="bg-black/80 rounded-3xl p-6">
          {/* Company Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#FCB523] rounded-2xl flex items-center justify-center">
              <Building2 className="h-8 w-8 text-black" />
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Company Name */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm font-medium">Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-300 border-0 text-black placeholder:text-gray-600 rounded-lg h-12"
                        placeholder=""
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Industry */}
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm font-medium">Industry</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-300 border-0 text-black placeholder:text-gray-600 rounded-lg h-12"
                        placeholder=""
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Phone and Email Row */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm font-medium">Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-300 border-0 text-black placeholder:text-gray-600 rounded-lg h-12"
                          placeholder=""
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="bg-gray-300 border-0 text-black placeholder:text-gray-600 rounded-lg h-12"
                          placeholder=""
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Website */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm font-medium">Website</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-300 border-0 text-black placeholder:text-gray-600 rounded-lg h-12"
                        placeholder=""
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Product */}
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm font-medium">Product</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-300 border-0 text-black placeholder:text-gray-600 rounded-lg h-12"
                        placeholder=""
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* City and Country Row */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm font-medium">City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-300 border-0 text-black placeholder:text-gray-600 rounded-lg h-12"
                          placeholder=""
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm font-medium">Country</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-300 border-0 text-black placeholder:text-gray-600 rounded-lg h-12"
                          placeholder=""
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Now Button */}
              <div className="pt-6 space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-[#FCB523] hover:bg-[#E8A41F] text-black font-semibold py-4 rounded-2xl h-12"
                >
                  Contact now
                </Button>
                
                {/* Go Back to Profile Button */}
                <Button
                  type="button"
                  onClick={handleGoToProfile}
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-black font-semibold py-4 rounded-2xl h-12"
                >
                  Go Back to Profile
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm">
        <div className="flex items-center justify-around py-3 px-6">
          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="flex flex-col items-center space-y-1 text-white/70 hover:text-white transition-colors"
          >
            <QrCode className="h-5 w-5" />
            <span className="text-xs font-medium">Generate</span>
          </button>

          {/* Center QR Button */}
          <div className="relative">
            <div className="w-14 h-14 bg-[#FCB523] rounded-full flex items-center justify-center shadow-lg">
              <QrCode className="h-7 w-7 text-white" />
            </div>
          </div>

          {/* History Button */}
          <button
            onClick={handleHistory}
            className="flex flex-col items-center space-y-1 text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            <History className="h-5 w-5" />
            <span className="text-xs font-medium">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}