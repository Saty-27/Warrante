import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload } from "lucide-react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const productSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  modelNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  location: z.string().optional(),
  purchaseDate: z.string().optional(),
  hasGuarantee: z.boolean(),
  hasWarranty: z.boolean(),
  notifyBefore: z.boolean(),
  addVendorDetails: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductDetails() {
  const [, setLocation] = useLocation();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      modelNumber: "",
      serialNumber: "",
      location: "",
      purchaseDate: "",
      hasGuarantee: false,
      hasWarranty: false,
      notifyBefore: false,
      addVendorDetails: false,
    },
  });

  const handleBack = () => {
    setLocation("/generate");
  };

  const onSubmit = (data: ProductFormData) => {
    console.log("Product data:", data);
    // Here you would typically save the data to your backend
    // Redirect to result page after saving
    setLocation("/result");
  };

  return (
    <div className="gradient-bg min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-black text-xl font-bold">Warante</h1>
        <div className="w-10 h-10"></div> {/* Spacer for centering */}
      </div>

      {/* Form Container */}
      <div className="flex-1 px-6">
        <div className="floating-panel bg-[hsl(0,0%,17%)] rounded-3xl p-6 h-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm font-medium">Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/90 border-0 rounded-xl py-3 px-4 text-gray-800 placeholder:text-gray-500"
                        placeholder="Enter product title"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Product Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm font-medium">Product Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/90 border-0 rounded-xl py-3 px-4 text-gray-800 placeholder:text-gray-500"
                        placeholder="Enter description"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Model Number */}
              <FormField
                control={form.control}
                name="modelNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm font-medium">Model Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/90 border-0 rounded-xl py-3 px-4 text-gray-800 placeholder:text-gray-500"
                        placeholder="Enter model number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Serial Number */}
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm font-medium">Serial Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/90 border-0 rounded-xl py-3 px-4 text-gray-800 placeholder:text-gray-500"
                        placeholder="Enter serial number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Item Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm font-medium">Item Location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white/90 border-0 rounded-xl py-3 px-4 text-gray-800 placeholder:text-gray-500"
                        placeholder="Enter location"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Purchase Date */}
              <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm font-medium">Purchase Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="bg-white/90 border-0 rounded-xl py-3 px-4 text-gray-800 placeholder:text-gray-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Checkboxes */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasGuarantee"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-white/50 data-[state=checked]:bg-[hsl(37,100%,50%)] data-[state=checked]:border-[hsl(37,100%,50%)]"
                        />
                      </FormControl>
                      <FormLabel className="text-white/80 text-sm font-medium">
                        Product has a guarantee ?
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasWarranty"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-white/50 data-[state=checked]:bg-[hsl(37,100%,50%)] data-[state=checked]:border-[hsl(37,100%,50%)]"
                        />
                      </FormControl>
                      <FormLabel className="text-white/80 text-sm font-medium">
                        Product has a warranty ?
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Upload Invoice */}
                <div className="flex items-center space-x-3">
                  <span className="text-white/80 text-sm font-medium">Upload Invoice</span>
                  <Button
                    type="button"
                    className="bg-[hsl(37,100%,50%)] hover:bg-[hsl(37,100%,45%)] text-black font-semibold py-2 px-6 rounded-xl"
                  >
                    Upload
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="notifyBefore"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-white/50 data-[state=checked]:bg-[hsl(37,100%,50%)] data-[state=checked]:border-[hsl(37,100%,50%)]"
                        />
                      </FormControl>
                      <FormLabel className="text-white/80 text-sm font-medium">
                        Notify Before{" "}
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">30 Days</span>
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addVendorDetails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-white/50 data-[state=checked]:bg-[hsl(37,100%,50%)] data-[state=checked]:border-[hsl(37,100%,50%)]"
                        />
                      </FormControl>
                      <FormLabel className="text-white/80 text-sm font-medium">
                        Do you want to add Vendor Details
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <Button 
                  type="submit"
                  className="w-full bg-[hsl(37,100%,50%)] hover:bg-[hsl(37,100%,45%)] text-black py-4 px-6 rounded-2xl font-semibold text-lg"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}