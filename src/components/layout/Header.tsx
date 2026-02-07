import { Globe, Phone, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Electricity", path: "/electricity" },
  { label: "Gas", path: "/gas" },
  { label: "Municipal", path: "/municipal" },
  { label: "Emergency", path: "/emergency" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <span className="text-lg font-bold">NS</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold leading-tight text-primary-foreground">
              {language === "en" ? "Nagrik Seva" : "नागरिक सेवा"}
            </h1>
            <p className="text-xs text-primary-foreground/80">
              {language === "en" ? "Citizen Services Portal" : "नागरिक सेवा पोर्टल"}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/10 ${
                location.pathname === item.path
                  ? "bg-primary-foreground/20"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="hidden gap-2 text-primary-foreground hover:bg-primary-foreground/10 sm:flex"
          >
            <Globe className="h-4 w-4" />
            {language === "en" ? "हिंदी" : "English"}
          </Button>

          <Link to="/emergency" className="hidden sm:block">
            <Button
              variant="secondary"
              size="sm"
              className="gap-2"
            >
              <Phone className="h-4 w-4" />
              {language === "en" ? "Emergency" : "आपातकाल"}
            </Button>
          </Link>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="hidden sm:block">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-t border-primary-foreground/20 bg-primary md:hidden">
          <div className="container flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-primary-foreground/10 ${
                  location.pathname === item.path
                    ? "bg-primary-foreground/20"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-primary-foreground/20 pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex-1 gap-2 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Globe className="h-4 w-4" />
                {language === "en" ? "हिंदी" : "English"}
              </Button>
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 gap-2 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full gap-2 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <User className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
