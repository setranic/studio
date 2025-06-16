
export default function AdminPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-b from-blue-50 to-background rounded-lg shadow-sm">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Panel de Administración</h1>
        <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-body">
          Bienvenido al panel de administración. Aquí podrás gestionar el contenido de tu aplicación.
        </p>
      </section>

      <section className="bg-card p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-headline font-semibold text-primary mb-6">Acciones Rápidas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-headline font-semibold text-accent mb-2">Gestionar Usuarios</h3>
            <p className="text-muted-foreground font-body">Ver y editar usuarios.</p>
          </div>
          <div className="p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-headline font-semibold text-accent mb-2">Gestionar Contenido</h3>
            <p className="text-muted-foreground font-body">Editar páginas y publicaciones.</p>
          </div>
          <div className="p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-headline font-semibold text-accent mb-2">Configuración</h3>
            <p className="text-muted-foreground font-body">Ajustes generales del sitio.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
