from rest_framework import routers
from .api import DocumentsViewSet,DocumentMetaViewSet

router=routers.DefaultRouter()
router.register('documents',DocumentsViewSet,'Documents')
router.register('document-meta',DocumentMetaViewSet,'document meta')

urlpatterns=router.urls