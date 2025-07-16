import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  compatibility: string;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('catalog');
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    address: '',
    notes: ''
  });

  const products: Product[] = [
    {
      id: 1,
      name: 'Boeing 737-800 Professional',
      category: 'Самолёты',
      price: 2499,
      image: '/img/f3054112-bb5b-45a1-884a-b118f334a4ef.jpg',
      rating: 4.8,
      compatibility: 'X-Plane 12',
      description: 'Высокодетализированный Boeing 737-800 с полным функционалом'
    },
    {
      id: 2,
      name: 'Аэропорт Домодедово UUDD',
      category: 'Аэропорты',
      price: 1299,
      image: '/img/f3054112-bb5b-45a1-884a-b118f334a4ef.jpg',
      rating: 4.6,
      compatibility: 'X-Plane 11/12',
      description: 'Точная копия московского аэропорта Домодедово'
    },
    {
      id: 3,
      name: 'Ultra Weather Plugin',
      category: 'Плагины',
      price: 899,
      image: '/img/f3054112-bb5b-45a1-884a-b118f334a4ef.jpg',
      rating: 4.9,
      compatibility: 'X-Plane 12',
      description: 'Реалистичная система погоды с живыми данными'
    },
    {
      id: 4,
      name: 'HD Texture Pack Europe',
      category: 'Текстуры',
      price: 599,
      image: '/img/f3054112-bb5b-45a1-884a-b118f334a4ef.jpg',
      rating: 4.7,
      compatibility: 'X-Plane 11/12',
      description: 'Высококачественные текстуры европейских городов'
    }
  ];

  const categories = ['Все', 'Самолёты', 'Аэропорты', 'Плагины', 'Текстуры'];
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Заказ оформлен! Вам придёт подтверждение на email.');
    setCartItems([]);
    setOrderForm({ name: '', email: '', address: '', notes: '' });
    setActiveSection('catalog');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="Plane" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">X-Shop</h1>
              <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                Авиасимуляторы
              </Badge>
            </div>
            
            <nav className="flex items-center gap-6">
              <Button 
                variant={activeSection === 'catalog' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('catalog')}
                className="text-white hover:text-blue-300"
              >
                <Icon name="Grid3X3" size={16} className="mr-2" />
                Каталог
              </Button>
              <Button 
                variant={activeSection === 'cart' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('cart')}
                className="text-white hover:text-blue-300 relative"
              >
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              {cartItems.length > 0 && (
                <Button 
                  variant={activeSection === 'checkout' ? 'default' : 'ghost'}
                  onClick={() => setActiveSection('checkout')}
                  className="text-white hover:text-blue-300"
                >
                  <Icon name="CreditCard" size={16} className="mr-2" />
                  Оформить
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {activeSection === 'catalog' && (
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="/img/bb052192-18a1-4636-ad2c-ffe878370e59.jpg" 
              alt="Cockpit" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-5xl font-bold text-white mb-6">
              Магазин дополнений для <span className="text-blue-400">X-Plane</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Профессиональные самолёты, детализированные аэропорты, реалистичные плагины 
              и высококачественные текстуры для вашего авиасимулятора
            </p>
            <div className="flex items-center justify-center gap-4 text-slate-300">
              <div className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-green-400" />
                <span>Совместимость с X-Plane 11/12</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Download" size={16} className="text-blue-400" />
                <span>Мгновенная загрузка</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Star" size={16} className="text-yellow-400" />
                <span>Высокие рейтинги</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Catalog Section */}
        {activeSection === 'catalog' && (
          <div>
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Категории товаров</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 
                      'bg-blue-600 text-white' : 
                      'border-slate-600 text-slate-300 hover:bg-slate-800'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                  <CardHeader className="p-0">
                    <div className="aspect-video bg-slate-700 rounded-t-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-blue-600/20 text-blue-300">
                        {product.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-300">{product.rating}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-white text-lg mb-2 line-clamp-2">
                      {product.name}
                    </CardTitle>
                    
                    <CardDescription className="text-slate-400 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </CardDescription>
                    
                    <div className="text-xs text-slate-500 mb-3">
                      Совместимость: {product.compatibility}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-400">
                        {product.price} ₽
                      </span>
                      <Button 
                        onClick={() => addToCart(product)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Icon name="Plus" size={16} className="mr-1" />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Cart Section */}
        {activeSection === 'cart' && (
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Корзина покупок</h3>
            
            {cartItems.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
                <Icon name="ShoppingCart" size={64} className="text-slate-600 mx-auto mb-4" />
                <h4 className="text-xl text-slate-300 mb-2">Корзина пуста</h4>
                <p className="text-slate-500 mb-4">Добавьте товары из каталога</p>
                <Button 
                  onClick={() => setActiveSection('catalog')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Перейти к каталогу
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.product.id} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{item.product.name}</h4>
                          <p className="text-slate-400 text-sm">{item.product.category}</p>
                          <p className="text-blue-400 font-semibold">{item.product.price} ₽</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white">Количество: {item.quantity}</span>
                          <Button 
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-xl font-bold text-white">
                      <span>Итого:</span>
                      <span className="text-blue-400">{getTotalPrice()} ₽</span>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setActiveSection('catalog')}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    Продолжить покупки
                  </Button>
                  <Button 
                    onClick={() => setActiveSection('checkout')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Оформить заказ
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Checkout Section */}
        {activeSection === 'checkout' && cartItems.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Оформление заказа</h3>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Order Form */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Контактная информация</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-300">Имя *</Label>
                      <Input
                        id="name"
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-slate-300">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={orderForm.email}
                        onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address" className="text-slate-300">Адрес *</Label>
                      <Input
                        id="address"
                        value={orderForm.address}
                        onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="notes" className="text-slate-300">Примечания</Label>
                      <Textarea
                        id="notes"
                        value={orderForm.notes}
                        onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Дополнительные пожелания..."
                      />
                    </div>
                    
                    <Separator className="bg-slate-600" />
                    
                    <div className="flex items-center justify-between text-xl font-bold text-white">
                      <span>К оплате:</span>
                      <span className="text-blue-400">{getTotalPrice()} ₽</span>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        onClick={() => setActiveSection('cart')}
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-800"
                      >
                        Назад к корзине
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 flex-1"
                      >
                        <Icon name="CreditCard" size={16} className="mr-2" />
                        Оформить заказ
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              {/* Order Summary */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Ваш заказ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">{item.product.name}</p>
                          <p className="text-slate-400 text-sm">Количество: {item.quantity}</p>
                        </div>
                        <span className="text-blue-400 font-semibold">
                          {item.product.price * item.quantity} ₽
                        </span>
                      </div>
                    ))}
                    
                    <Separator className="bg-slate-600" />
                    
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-white">Итого:</span>
                      <span className="text-blue-400">{getTotalPrice()} ₽</span>
                    </div>
                    
                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-green-400 mb-2">
                        <Icon name="Shield" size={16} />
                        <span className="font-semibold">Безопасная покупка</span>
                      </div>
                      <p className="text-slate-400 text-sm">
                        Все файлы проверены на совместимость. 
                        Подтверждение заказа придёт на email.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;