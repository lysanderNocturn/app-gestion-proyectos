import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Toaster, toast } from 'sonner'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Moon, Sun, RotateCw, AlertCircle } from 'lucide-react'
import { useProyectos } from '@/hooks/useProyectos'

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

  const handleRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
    toast.success('Datos actualizados')
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30">
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-30 shadow-sm">
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

          <div className="flex items-center gap-3">
            {/* <Button variant="outline" size="icon" onClick={handleRefresh} disabled={refreshing || isLoading} className={refreshing ? 'animate-spin' : ''}            >
              <RotateCw className="h-4 w-4" />
            </Button> */}

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

            {/* Gráfico principal */}
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="icon" onClick={handleRefresh} disabled={refreshing || isLoading} className={refreshing ? 'animate-spin' : ''}            >
              <RotateCw className="h-4 w-4" />
            </Button>
                  <div>
                    <CardTitle>Avance por Proyecto</CardTitle>
                    <CardDescription>Porcentaje de completitud actual</CardDescription>
                  </div>
                  <Badge variant="secondary">{proyectos.length} proyectos</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} />
                      <YAxis dataKey="nombre" type="category" width={180} tick={{ fontSize: 13 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                      />
                      <Bar
                        dataKey="completado"
                        fill="hsl(var(--primary))"
                        radius={[6, 6, 6, 6]}
                        barSize={32}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tabla rápida de proyectos */}
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
                      {proyectos.slice(0, 6).map(proyecto => (  // Muestra solo los primeros 6 para no saturar
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