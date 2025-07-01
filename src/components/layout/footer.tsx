
export default function Footer() {
  return (
    <footer className="py-8 bg-muted text-muted-foreground text-center border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-body">
          &copy; {new Date().getFullYear()} Setranic. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
