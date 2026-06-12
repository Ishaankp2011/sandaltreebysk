import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit2, Trash2, LogOut, Loader2, Package, Eye, EyeOff, Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  signIn, signOut, getCurrentProfile, isAdmin,
  getAdminProducts, createProduct, updateProduct, deleteProduct, uploadProductImage 
} from "@/lib/api";
import { supabase, type Product, type InsertProduct } from "@/lib/supabase";

type ProductFormData = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

const defaultFormData: ProductFormData = {
  name: "",
  weight: "",
  original_price: 0,
  price: 0,
  description: "",
  benefits: [],
  image: "",
  category: "ceremonial",
  is_active: true,
  sort_order: 0,
};


// Image Upload Component
function ImageUpload({ 
  value, 
  onChange, 
  disabled 
}: { 
  value: string; 
  onChange: (url: string) => void;
  disabled?: boolean;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({ title: "Invalid file", description: "Please upload an image file", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max file size is 5MB", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadProductImage(file);
      onChange(url);
      toast({ title: "Image uploaded successfully" });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Product Image</Label>
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-border'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={disabled || isUploading}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
          </div>
        ) : value ? (
          <div className="relative">
            <img src={value} alt="Product" className="w-full h-40 object-contain rounded" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-8">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP up to 5MB</p>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Input
          placeholder="Or paste image URL"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || isUploading}
        />
      </div>
    </div>
  );
}


// Login Form Component
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await signIn(identifier, password);
      
      // Check if user is admin
      const adminCheck = await isAdmin();
      if (!adminCheck) {
        await signOut();
        setError("Access denied. Admin privileges required.");
        return;
      }
      
      toast({ title: "Welcome back!" });
      onLogin();
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-8 left-8 w-4 h-4 border-2 border-white/20 rotate-45" />
          <div className="absolute top-20 right-12 w-3 h-3 border-2 border-white/15 rotate-12" />
          <div className="absolute bottom-20 left-16 w-5 h-5 border-2 border-white/10 rotate-45" />
          <div className="absolute bottom-32 right-8 w-2 h-2 bg-white/20 rounded-full" />
          <div className="absolute top-1/3 left-1/4 w-6 h-6 border border-white/10 rounded-full" />
          <div className="absolute top-2/3 right-1/3 w-4 h-4 border border-white/15 rounded-full" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="mb-8">
            <h1 className="text-5xl xl:text-6xl font-serif font-bold text-white mb-4">
              CHAEEN
            </h1>
            <p className="text-xl text-white/80 font-light">
              Premium Matcha Admin Portal
            </p>
          </div>
          
          <div className="space-y-6 text-white/70">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span>Manage your product inventory</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <span>Upload and organize images</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Edit2 className="w-5 h-5 text-white" />
              </div>
              <span>Real-time content updates</span>
            </div>
          </div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-primary">CHAEEN</h1>
            <p className="text-muted-foreground text-sm">Admin Portal</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                <Package className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800">Welcome back</h2>
              <p className="text-slate-500 mt-1 text-sm">Enter your credentials to continue</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-slate-700 font-medium">Email or Phone</Label>
                <Input 
                  id="identifier" 
                  type="text"
                  value={identifier} 
                  onChange={(e) => setIdentifier(e.target.value)} 
                  placeholder="admin@example.com"
                  disabled={isLoading}
                  className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••"
                    className="h-12 pr-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                  <X className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-lg shadow-primary/20 transition-all" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
          
          <p className="text-center text-slate-400 text-xs mt-6">
            Protected admin area • Authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
}


// Product Form Component
function ProductForm({ 
  product, 
  onSubmit, 
  onCancel,
  isLoading 
}: { 
  product?: Product; 
  onSubmit: (data: InsertProduct) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<ProductFormData>(
    product ? {
      name: product.name,
      weight: product.weight,
      original_price: product.original_price,
      price: product.price,
      description: product.description,
      benefits: product.benefits,
      image: product.image,
      category: product.category,
      is_active: product.is_active,
      sort_order: product.sort_order,
    } : defaultFormData
  );
  const [benefitsText, setBenefitsText] = useState(product?.benefits.join("\n") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      benefits: benefitsText.split("\n").filter(b => b.trim()),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input 
            id="name" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <Input 
            id="weight" 
            value={formData.weight} 
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="e.g., 30g"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(v: any) => setFormData({ ...formData, category: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ceremonial">Ceremonial</SelectItem>
              <SelectItem value="culinary">Culinary</SelectItem>
              <SelectItem value="sets">Sets</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="original_price">Original Price (₹)</Label>
          <Input 
            id="original_price" 
            type="number"
            value={formData.original_price} 
            onChange={(e) => setFormData({ ...formData, original_price: parseInt(e.target.value) || 0 })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Sale Price (₹)</Label>
          <Input 
            id="price" 
            type="number"
            value={formData.price} 
            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sort_order">Sort Order</Label>
          <Input 
            id="sort_order" 
            type="number"
            value={formData.sort_order} 
            onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
          />
        </div>
        
        <div className="flex items-center gap-2 pt-6">
          <Switch 
            id="is_active"
            checked={formData.is_active} 
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
          <Label htmlFor="is_active">Product is active</Label>
        </div>
        
        <div className="sm:col-span-2">
          <ImageUpload 
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            disabled={isLoading}
          />
        </div>
        
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            required
          />
        </div>
        
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="benefits">Benefits (one per line)</Label>
          <Textarea 
            id="benefits" 
            value={benefitsText} 
            onChange={(e) => setBenefitsText(e.target.value)}
            rows={3}
            placeholder="Rich in Antioxidants&#10;Supports Heart Health&#10;Boosts Immunity"
          />
        </div>
      </div>
      
      <DialogFooter className="gap-2 flex-col sm:flex-row">
        <DialogClose asChild>
          <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={onCancel}>Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isLoading || !formData.image} className="w-full sm:w-auto">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {product ? "Update Product" : "Create Product"}
        </Button>
      </DialogFooter>
    </form>
  );
}


// Admin Dashboard Component
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: getAdminProducts,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsCreateOpen(false);
      toast({ title: "Product created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertProduct> }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsEditOpen(false);
      setEditingProduct(null);
      toast({ title: "Product updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDeleteConfirm(null);
      toast({ title: "Product deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <h1 className="text-lg sm:text-2xl font-serif font-bold">CHAEEN Dashboard</h1>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-1 sm:gap-2 text-sm sm:text-base px-3 sm:px-4">
          <LogOut className="h-3 w-3 sm:h-4 sm:w-4" /> 
          <span className="hidden xs:inline">Logout</span>
          <span className="xs:hidden">Exit</span>
        </Button>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 md:p-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium">Product Inventory</h2>
            <p className="text-muted-foreground mt-1">{products.length} products total</p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1 sm:gap-2 text-sm sm:text-base px-3 sm:px-4">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" /> 
                <span className="hidden xs:inline">Add Product</span>
                <span className="xs:hidden">Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xs sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
              </DialogHeader>
              <ProductForm 
                onSubmit={(data) => createMutation.mutate(data)}
                onCancel={() => setIsCreateOpen(false)}
                isLoading={createMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12 sm:py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 sm:py-20 border border-dashed rounded-lg">
            <Package className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-base sm:text-lg font-medium">No products yet</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">Get started by adding your first product</p>
            <Button onClick={() => setIsCreateOpen(true)} className="text-sm sm:text-base">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" /> Add Product
            </Button>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-card border border-border rounded-lg overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden lg:table-cell">Weight</TableHead>
                    <TableHead className="hidden lg:table-cell">Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                        ) : (
                          <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="max-w-[200px] truncate">{product.name}</div>
                        <div className="text-xs text-muted-foreground md:hidden">{product.weight}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold">₹{product.price}</span>
                          <span className="text-xs text-muted-foreground line-through">₹{product.original_price}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{product.weight}</TableCell>
                      <TableCell className="hidden lg:table-cell">{product.sort_order}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          product.is_active 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {product.is_active ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setEditingProduct(product);
                              setIsEditOpen(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setDeleteConfirm(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {products.map((product) => (
                <div key={product.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded" />
                      ) : (
                        <div className="h-16 w-16 bg-muted rounded flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm leading-tight">{product.name}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                          product.is_active 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {product.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <span>{product.weight}</span>
                        <span>Order: {product.sort_order}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary">₹{product.price}</span>
                          <span className="text-xs text-muted-foreground line-through">₹{product.original_price}</span>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setEditingProduct(product);
                              setIsEditOpen(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setDeleteConfirm(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={(open) => {
          setIsEditOpen(open);
          if (!open) setEditingProduct(null);
        }}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <ProductForm 
                product={editingProduct}
                onSubmit={(data) => updateMutation.mutate({ id: editingProduct.id, data })}
                onCancel={() => {
                  setIsEditOpen(false);
                  setEditingProduct(null);
                }}
                isLoading={updateMutation.isPending}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button 
                variant="destructive" 
                onClick={() => deleteConfirm && deleteMutation.mutate(deleteConfirm)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}


// Main Admin Component
export default function Admin() {
  const [authState, setAuthState] = useState<'loading' | 'unauthenticated' | 'authenticated'>('loading');

  useEffect(() => {
    // Always sign out first when visiting admin page directly
    // This ensures fresh login is required each time
    const initAdmin = async () => {
      try {
        // Sign out any existing session to require fresh login
        await supabase.auth.signOut();
        setAuthState('unauthenticated');
      } catch (error) {
        console.error('Error signing out:', error);
        setAuthState('unauthenticated');
      }
    };
    
    initAdmin();
  }, []);

  if (authState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (authState === 'unauthenticated') {
    return <LoginForm onLogin={() => setAuthState('authenticated')} />;
  }

  return <AdminDashboard onLogout={() => setAuthState('unauthenticated')} />;
}
