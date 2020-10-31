from rest_framework import serializers
from .models import Documents, DocumentMeta


class DocumentsSerializer(serializers.ModelSerializer):
    documentMeta = serializers.SlugRelatedField(many=True,read_only=True,
                                          slug_field='documentMeta')
    # metavalues = serializers.RelatedField(many=True,read_only=True)                                    
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
            'documentMeta'
        ]


class DocumentMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentMeta
        fields = "__all__"
