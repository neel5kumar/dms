from rest_framework import serializers
from .models import Documents, DocumentMeta
# from rest_framework_msf import MultiSlugField
# from rest_framework_msf.fields import MultiSlugRelatesdField
from rest_framework_msf.fields import MultiSlugRelatedField
from django.conf import settings


class DocumentsSerializer(serializers.ModelSerializer):
    documentMeta = serializers.SlugRelatedField(many=True, read_only=True,
                                         slug_field=('documentMetaValue'))

    # documentMeta2 = serializers.SlugRelatedField(many=True,read_only=True,
    #   slug_field=('documentMetaAuto'))
    # metavalues = serializers.RelatedField(many=True,read_only=True)

    def to_representation(self, instance):
        result = {
            'id': instance.id,
            'documentName': instance.documentName,
            'decumentDesc': instance.decumentDesc,
            'uploadedFile': self.context['request'].build_absolute_uri(instance.uploadedFile.url),
            'uploadedFileName': instance.uploadedFileName,
            'documentSize': instance.documentSize,
        }
        try:
            meta = DocumentMeta.objects.filter(document=instance.id).all()
        except DocumentMeta.DoesNotExist:
            meta = None
        if(meta is not None):
            first=meta.first()
            if first is not None:
                result['documentMetaValue']=first.documentMetaValue
                result['documentMetaAuto']=first.documentMetaAuto
            # documentMetaResult=[]
            # print("type" )
            # print(type(meta))
            # for m in meta.all():
            #     documentMetaResult.append({"documentMetaValue":m.documentMetaValue})
            #     documentMetaResult.append({"documentMetaAuto":m.documentMetaAuto})
            #     # documentMetaResult.append(m.documentMetaAuto)
            #     print(m)
            # result['documentMetaResult']=documentMetaResult
        return result

    #     # meta=DocumentMeta.objects().filter(document=instance.id)
    #     # print(meta)
    #     print(instance.documentMeta)
    #     print("to representation "+str(instance.id))
    #     result = {
    #         'id': instance.id,
    #         'documentName': instance.documentName,
    #         'decumentDesc': instance.decumentDesc,
    #         'uploadedFile': instance.uploadedFile,
    #         'uploadedFileName': instance.uploadedFileName,
    #         'documentSize': instance.documentSize,
    #     }
    #     # result={
    #     #      'id': instance.id,
    #     # }
    #     try:
    #         meta = DocumentMeta.objects.filter(document=instance.id).get()
    #     except DocumentMeta.DoesNotExist:
    #         meta = None
    #     # meta = DocumentMeta.objects.filter(document=instance.id).get()
    #     if(meta is not None):
    #         result['documentMetaValue']=meta.documentMetaValue
    #         result['documentMetaAuto']=meta.documentMetaAuto
    #         return result
    #     else:
    #         return result

    class Meta:
        model = Documents
        fields = [field.name for field in model._meta.fields]
        # fields="__all__"

        fields = [
            'id',
            'documentName',
            'decumentDesc',
            'uploadedFile',
            'uploadedFileName',
            'documentSize',
            'documentMeta',
        ]


class DocumentMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentMeta
        fields = "__all__"
