from rest_framework import routers
from .api import DocumentsViewSet

router=routers.DefaultRouter()
router.register('docs',DocumentsViewSet,'Documents')

urlpatterns=router.urls