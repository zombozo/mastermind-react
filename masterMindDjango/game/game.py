

from datetime import datetime
import json
import random

from game.models import gameModel





class game:
    def __init__(self):
        self.id = int
        self.time_start = datetime.utcnow()
        self.time_end = datetime.utcnow()
        self.secuenciaOculta = []
        self.maxIntents=8
        self.grid=grid()
        self.coloresCollect = [
        "800080","FF00FF",
        "000080","0000FF",
        "008080","00FFFF",
        "00FF00","FFFF00",
        "FF0000"
        ]
        self.model = None
        self.coloresAyuda = ["32cd32","cae00d"]
        
        
    def crearSecuenciaOculta(self, color=None, colores=None):
        
        if colores == None:
            colores = []
        if color !=None:
            colores.append(color)
            if len(colores) == 4:
                return colores
        return self.crearSecuenciaOculta(colores=colores,color=random.choice(self.coloresCollect))
    
    def startGame(self):
        self.secuenciaOculta=self.crearSecuenciaOculta()
        
        self.model = gameModel.objects.create(combinacionSecreta=json.dumps(self.secuenciaOculta))
        self.interfazJugar()
        
    def endGame(self):
        pass
    
    def interfazJugar(self):
        pass
    
    def comparar(self, list):
        id = list["game"]
        aciertos = []
        thisGame = gameModel.objects.get(pk=id)
        self.secuenciaOculta=thisGame.combinacionSecreta
        self.secuenciaOculta = json.loads(self.secuenciaOculta)
        contador = 0
        for casilla in list["lista"]:
            if casilla["color"] == self.secuenciaOculta[contador]:
                aciertos.append("66ff00")
                print(f"true {casilla['color']} -- {self.secuenciaOculta[contador]}")
            else:
                if casilla["color"] in self.secuenciaOculta:
                    print(f"existe en la secuencia oculta --> {casilla['color']} - {self.secuenciaOculta[self.secuenciaOculta.index(casilla['color'])]}")
                    aciertos.append("f58700")
                else: 
                    aciertos.append("908e8e")
            contador += 1
        print(aciertos)
        print(self.secuenciaOculta)
        print(list)
        return aciertos
    
    def compararMismaLinea(self, list):

        for x, y in zip(list, self.secuenciaOculta):
            if x != y:
                return False
        
    def existeEnsecuenciaOculta(self, list):
        pass
        
class grid:
    def __init__(self) -> None:
        self.rows=[]
        self.initializeGrid()
        print(self.rows)
    
    
    def initializeGrid(self):
        self.rows=[self.crearFila(i) for i in range(8)]
        
    def crearFila(self, fila):
        return [{'fila':f'{fila}-{i}','value':0} for i in range(4)]    
    
    def print(self):
        return self.rows
        
    def checkMovement():
        pass
    
    def compararFila():
        pass
    
    def addColor():
        pass
    
class arbitro:
    def __init__(self) -> None:
        pass
    
    def start():
        pass
    
if __name__ == "__main__":
    newGame = game()
    newGame.startGame()
    