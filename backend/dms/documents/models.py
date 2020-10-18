from django.db import models
import uuid
# Create your models here.

def upload_file(instance,fileName):
    uuidValue=str(uuid.uuid4())
    fileName="/".join(["file",str(instance.documentName), uuidValue+"_"+fileName])
    instance.logo_file_name=fileName
    return fileName

class Documents(models.Model):
    documentName = models.CharField(max_length=100)
    decumentDesc = models.CharField(max_length=200,blank=True)
    filePath=models.FileField(upload_to=upload_file, blank=True)
    version=models.CharField(max_length=30,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length=200,blank=True)
    class Meta:
        ordering = ['documentName']

    def __str__(self):
        return self.documentName
