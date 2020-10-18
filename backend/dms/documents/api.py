from .models import Documents
from rest_framework import viewsets, permissions
from .serializers import DocumentsSerializer
from collections import OrderedDict
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class Pagination(PageNumberPagination):
    
    def paginate_queryset(self, queryset, request, view=None):
        self.count_objects = queryset.filter(id__gt=2).count()
        return super(Pagination, self).paginate_queryset(queryset, request, view=view)

    def get_paginated_response(self, data):
        print("pagination called here-->")
        return Response(OrderedDict([
            ('total_pages', self.page.paginator.num_pages),
            ('total', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data),
        ]))


class DocumentsViewSet(viewsets.ModelViewSet):
    print("querying .....")
    queryset=Documents.objects.all().order_by('id')
    # queryset = sorted(queryset, key= lambda t: t.id)
    permission_classes=[permissions.AllowAny]##TODO add more 
    serializer_class=DocumentsSerializer
    pagination_class = Pagination
