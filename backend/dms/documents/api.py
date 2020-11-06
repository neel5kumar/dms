from .models import Documents,DocumentMeta
from documents.doc_reader import stringFromDoc
from rest_framework import viewsets, permissions
from .serializers import DocumentsSerializer,DocumentMetaSerializer
from collections import OrderedDict
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from django.http import QueryDict
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

class DogFeedView(APIView):
#  authentication_classes = (authentication.TokenAuthentication,)
#  permission_classes = (IsOwnerOrReadOnly,)
 
 def get(self, request, pk=None):
    print("get ")
    #  dog = get_object_or_404(Dog, pk=pk)
    #  dog.feed()
    #  return Response ({“msg“: “Dog fed“, status=status.HTTP_200_OK})
    return Response({"hello":"20"})

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
    permission_classes=[permissions.AllowAny]##TODO add more 
    serializer_class=DocumentsSerializer
    pagination_class = Pagination
    def get_queryset(self):
        print("querying get .....")
        
        searchMetaText = self.request.query_params.get('searchMetaText', None)
        if searchMetaText is not None:
            print("searchMetaText--->"+searchMetaText)
            documentIds=DocumentMeta.objects\
                .filter(Q(documentMetaValue__contains=searchMetaText) | Q(documentMetaAuto__contains=searchMetaText))\
                    .values('document').all()
            print("documentIds---")
            print(documentIds)
            queryset=Documents.objects.all().filter(pk__in=documentIds).order_by('id')
            return queryset.all()
        else:
            queryset=Documents.objects.all().order_by('id')
            return queryset.all()
        # queryset = sorted(queryset, key= lambda t: t.id)
        
        


class DocumentMetaViewSet(viewsets.ModelViewSet):
    
    # def get_queryset(self):
    #     # queryset = Documents.objects.all()
    #     docMetaQueryset=DocumentMeta.objects.all()
    #     documentId = self.request.query_params.get('documentId', None)
    #     print("Get using documentId:"+documentId)
    #     if documentId is not None:
    #         # docMetaQueryset=DocumentMeta.objects.all()
    #         docMetaQueryset=docMetaQueryset.filter(document=documentId)
    #         # queryset = queryset.filter(purchaser__document=documentId)
    #     return docMetaQueryset
    def  delete(self, request, pk=None):
        print("deleting .....")
        print(request)
        print(pk)
        print(type(request))
        print(request.query_params)
        print(QueryDict(request.body))
        print(request.query_params['documentId'])
        documentId=request.query_params['documentId']
        print("documentId:"+documentId)
        DocumentMeta.objects.filter(document=documentId).delete()
        
        # print(QueryDict(request.url))
        return Response(data='delete success, enhance')

    # def destroy(self, request, *args, **kwargs):
    #     print("Creating destroy")
    #     doctor = self.get_object()
    #     doctor.is_active = False
    #     doctor.save()
    #     return Response(data='delete success')

    # def destroy(self, request, *args, **kwargs):
    #     print("destroy :ing")
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    def delete_queryset(modeladmin, request, queryset):
        print('delete')
    def create(self, request, *args, **kwargs):
        # DocumentMeta.objects.create()
        print("creating .....")
        print(request)
        print(QueryDict(request.body))
        print(args)
        print(kwargs)
        resultData=request.data.copy()
        documentId=resultData['document']
        mostNTags=int(resultData['mostNTags'])
        print("resultData---->")
        print(resultData)
        # return Response(data='create success, enhance')
        document=Documents.objects.filter(id=documentId).get()
        textFromDoc=stringFromDoc(document.uploadedFile.path,mostNTags)
        resultData['documentMetaAuto']=textFromDoc
        serializer = self.get_serializer(data=resultData)
        serializer.is_valid(raise_exception=True)#ToDO fix : is_valid
        # result=self.perform_create(serializer)
        
        print("document--->")
        print(document.uploadedFile.path)
        print(document.uploadedFile)
        print(document.uploadedFileName)
        print("resultData")
        print(resultData)
       
       
        print("resultData2")
        print(resultData)
        result=serializer.save()
        print("result")
        print("textFromDoc")
        print(textFromDoc)
        print(result.id)
        headers = self.get_success_headers(serializer.data)
        # token, created = Token.objects.get_or_create(user=serializer.instance)
        return Response({"id":result.id,"msg":"Document meta crated, id="+str(result.id)}, status=status.HTTP_201_CREATED, headers=headers)



        # is_many = isinstance(request.data, list)
        # serializer = self.get_serializer(data=request.data, many=is_many)
        # serializer_class=DocumentMetaSerializer
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        # headers = self.get_success_headers(serializer.data)
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    # print("querying .....")
    queryset=DocumentMeta.objects.all().order_by('id')
    # queryset = sorted(queryset, key= lambda t: t.id)
    permission_classes=[permissions.AllowAny]##TODO add more 
    serializer_class=DocumentMetaSerializer
    pagination_class = Pagination

    # @action(detail=False, methods=['get'])
    # def delete_all(self, request):
    #     print("delete_all")
    #     # Product.objects.all().delete()
    #     return Response('success')

    @action(methods=['post'], detail=False)
    def multi_update(self, request, *args, **kwargs):
        print("delete_all")
        return Response('success')
        # queryset = self.filter_queryset(self.get_queryset())
        # serializer = self.get_serializer(instance=queryset, data=request.data, many=True, partial=True) # add "partial=True"
        # valid = serializer.is_valid(raise_exception=True)
        # logger.error(serializer.validated_data)
        # self.perform_update(serializer)
        # return Response(serializer.data)