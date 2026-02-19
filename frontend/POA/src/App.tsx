import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Toaster, toast } from 'sonner'
import {  BarChart,  Bar,  XAxis,  YAxis,  CartesianGrid,  Tooltip,  ResponsiveContainer } from 'recharts'
import { Moon, Sun, RotateCw, AlertCircle } from 'lucide-react'
import { useProyectos } from '@/hooks/useProyectos'
import { Link } from 'react-router-dom'


// Hook dark mode (persistente)
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (saved) setTheme(saved)
    else if (prefersDark) setTheme('dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}

function App() {
  const { data: proyectos = [], isLoading, error, refetch } = useProyectos()
  const { theme, toggle } = useTheme()
  const [refreshing, setRefreshing] = useState(false)

  // Progreso promedio
  const progresoPromedio = proyectos.length
    ? Math.round(
        proyectos.reduce((sum, p) => sum + (p.porcentajeCompletado || 0), 0) / proyectos.length
      )
    : 0

  // Datos para gráfico
  const chartData = proyectos.map(p => ({
    nombre: p.nombre.length > 25 ? p.nombre.slice(0, 22) + '...' : p.nombre,
    completado: p.porcentajeCompletado || 0,
  }))

  // Manejo de error
  useEffect(() => {
    if (error) {
      toast.error('Error al cargar proyectos', {
        description: error.message || 'Verifica el backend',
        icon: <AlertCircle />,
      })
    }
  }, [error])

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30">
      <header className="border-b bg-background backdrop-blur-md sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="font-bold text-xl">GP</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Gestión de Proyectos</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Monitoreo en tiempo real • {new Date().toLocaleDateString('es-MX')}
              </p>
            </div>
          </div>

          <div className="flex items gap-6">
            <Button asChild variant="outline" className='mt-6'>
              <Link to="/actividades">Gestionar actividades</Link>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggle}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {isLoading ? (
          <div className="space-y-8 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-10 w-1/3 mb-4" />
                    <Skeleton className="h-3 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-100 w-full rounded-xl" />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-10">
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Progreso General</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{progresoPromedio}%</div>
                  <Progress value={progresoPromedio} className="h-2 mt-4" />
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Proyectos Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{proyectos.length}</div>
                  <p className="text-sm text-muted-foreground mt-1">Activos y planificados</p>
                </CardContent>
              </Card>
            </div>
            
            {proyectos.length > 0 && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Lista de Proyectos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Proyecto</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Progreso</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {proyectos.slice(0, 25).map(proyecto => ( 
                        <TableRow key={proyecto.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="font-medium">{proyecto.nombre}</TableCell>
                          <TableCell>
                            <Badge variant={proyecto.estadoActual === 'En progreso' ? 'default' : 'secondary'}>
                              {proyecto.estadoActual}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Progress value={proyecto.porcentajeCompletado} className="w-24 h-2" />
                              <span className="text-sm font-medium">
                                {proyecto.porcentajeCompletado || 0}%
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      <Toaster position="top-center" richColors expand duration={4000} />
    </div>
  )
}

export default App