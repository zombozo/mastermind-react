


from game.views import homeView, APINuevaGrilla
from django.urls import path

urlpatterns = [
    path("",view=homeView.as_view(), name="home"),
    path("api/",view=APINuevaGrilla.as_view(), name="api")
]
