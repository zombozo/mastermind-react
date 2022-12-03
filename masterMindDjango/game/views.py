import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.generic import CreateView, TemplateView
from django.shortcuts import render

from .game import game




class homeView(TemplateView):
    template_name="index.html"
    
    def get(self, request, *args, **kwargs):
        newGame = game()
        newGame.startGame()
        context = {
            'colores': newGame.coloresCollect,
            'filas': range(8),
            'circulos': range(4),
            'grid': newGame.grid.print(),
            'grid_json': json.dumps(newGame.grid.print()),
            'id':newGame.model.pk,
            'fila': 0,
        }
        return render(request, self.template_name, context)
    
    
class APINuevaGrilla(APIView):
    
    def post(self, request):
        data = request.data
        for diccionario in data:
            lista = json.loads(diccionario)
            _game =  game()
            aciertos = json.dumps(_game.comparar(list=lista))
        return Response(aciertos, status=status.HTTP_201_CREATED)
    
