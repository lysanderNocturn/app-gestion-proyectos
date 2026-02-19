import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

// Datos de ejemplo estáticos (solo visual)
const actividadesEjemplo = [
  {
    id: 1,
    unidad: "Unidad Administrativa A",
    departamento: "Departamento de Finanzas",
    metaTotal: 150000,
    t1: 40000,
    t2: 35000,
    t3: 40000,
    t4: 35000,
    porcentajeAnual: 80,
    observaciones: "Avance sólido, evidencia cargada",
  },
  {
    id: 2,
    unidad: "Unidad Administrativa B",
    departamento: "Departamento de Recursos Humanos",
    metaTotal: 90000,
    t1: 20000,
    t2: 18000,
    t3: 15000,
    t4: 0,
    porcentajeAnual: 59,
    observaciones: "Retraso en Q4 por falta de personal",
  },
  {
    id: 3,
    unidad: "Unidad Administrativa C",
    departamento: "Departamento de Operaciones",
    metaTotal: 200000,
    t1: 50000,
    t2: 50000,
    t3: 50000,
    t4: 50000,
    porcentajeAnual: 100,
    observaciones: "Completado al 100%",
  },
]

export default function Actividades() {
  const [modalAbierto, setModalAbierto] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Actividades</h1>
            <p className="text-muted-foreground mt-1">
              Registro y seguimiento de metas y avances trimestrales
            </p>
          </div>
          <Button onClick={() => setModalAbierto(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Actividad
          </Button>
        </div>

        {/* Tarjetas resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Actividades Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{actividadesEjemplo.length}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">% Promedio Anual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {Math.round(
                  actividadesEjemplo.reduce((sum, a) => sum + (a.porcentajeAnual || 0), 0) /
                    actividadesEjemplo.length
                )}%
              </div>
              <Progress
                value={
                  actividadesEjemplo.reduce((sum, a) => sum + (a.porcentajeAnual || 0), 0) /
                  actividadesEjemplo.length
                }
                className="h-2 mt-3"
              />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">En Progreso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {actividadesEjemplo.filter(a => a.porcentajeAnual < 100 && a.porcentajeAnual > 0).length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Completadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {actividadesEjemplo.filter(a => a.porcentajeAnual === 100).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla principal */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Registro de Actividades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Unidad / Departamento</TableHead>
                    <TableHead>Meta Total</TableHead>
                    <TableHead>Trimestres</TableHead>
                    <TableHead>% Anual</TableHead>
                    <TableHead>Observaciones</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {actividadesEjemplo.map(act => (
                    <TableRow key={act.id} className="hover:bg-muted/60 transition-colors">
                      <TableCell className="font-medium">{act.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{act.unidad}</div>
                        <div className="text-sm text-muted-foreground">{act.departamento}</div>
                      </TableCell>
                      <TableCell>${(act.metaTotal || 0).toLocaleString()}</TableCell>
                      <TableCell className="text-sm">
                        <div>T1: ${(act.t1 || 0).toLocaleString()}</div>
                        <div>T2: ${(act.t2 || 0).toLocaleString()}</div>
                        <div>T3: ${(act.t3 || 0).toLocaleString()}</div>
                        <div>T4: ${(act.t4 || 0).toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={act.porcentajeAnual} className="w-20 h-2" />
                          <Badge variant="secondary" className={act.porcentajeAnual === 100 ? "bg-green-100 text-green-800" : ""}>
                            {act.porcentajeAnual}%
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                        {act.observaciones}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de creación (solo visual por ahora) */}
      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Nueva Actividad</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <Label>Unidad Administrativa</Label>
                <Input placeholder="Selecciona o escribe unidad" />
              </div>
              <div>
                <Label>Departamento</Label>
                <Input placeholder="Selecciona departamento" />
              </div>
              <div>
                <Label>Meta Total</Label>
                <Input type="number" placeholder="Ej: 150000" />
              </div>
              <div>
                <Label>Observaciones</Label>
                <Textarea placeholder="Detalles adicionales..." rows={3} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Meta Trimestre 1</Label>
                  <Input type="number" placeholder="Ej: 40000" />
                </div>
                <div>
                  <Label>Meta Trimestre 2</Label>
                  <Input type="number" placeholder="Ej: 35000" />
                </div>
                <div>
                  <Label>Meta Trimestre 3</Label>
                  <Input type="number" placeholder="Ej: 40000" />
                </div>
                <div>
                  <Label>Meta Trimestre 4</Label>
                  <Input type="number" placeholder="Ej: 35000" />
                </div>
              </div>

              <div>
                <Label>% Anual Esperado</Label>
                <Input type="number" min="0" max="100" placeholder="Ej: 80" />
              </div>

              <div>
                <Label>Evidencia / Archivo</Label>
                <Input type="file" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalAbierto(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast.success("Actividad creada (simulada)")
              setModalAbierto(false)
            }}>
              Crear Actividad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}