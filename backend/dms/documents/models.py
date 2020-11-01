from django.db import models
import uuid
from django.views.generic.edit import DeleteView, View
# Create your models here.

from django.dispatch import receiver
def upload_file(instance, fileName):
    uuidValue = str(uuid.uuid4())
    fileName = "/".join(["file", str(instance.documentName),
                        uuidValue+"_"+fileName])
    instance.uploadedFileName = fileName
    print("uploading "+fileName)
    return fileName


class Documents(models.Model):
    # def save(self, *args, **kwargs):
    #     print('saving doc')

    documentName = models.CharField(max_length=100)
    decumentDesc = models.CharField(max_length=200,blank=True)
    uploadedFile=models.FileField(upload_to=upload_file, blank=True)
    uploadedFileName=models.CharField(max_length=200, blank=True)
    documentSize=models.CharField(max_length=200, blank=True)
    version=models.CharField(max_length=30,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length=200,blank=True)
    class Meta:
        ordering = ['documentName']

    def __str__(self):
        return self.documentName

class DocumentMeta(models.Model):
    
    documentMetaValue=models.CharField(max_length=1000)
    documentMetaAuto=models.CharField(max_length=1000000,blank=True)
    document = models.ForeignKey(Documents, related_name="documentMeta", on_delete=models.CASCADE)
    # def delete(self, *args, **kwargs):
    #     super.delete(*args, **kwargs)
    
    # def save(self, *args, **kwargs):
    #     print('saving')
    

    def __unicode__(self):
        return '%d: %s' % (self.documentMeta, self.document)


class DocumentMetaDelete(DeleteView):
    model = DocumentMeta
    print("deleting.....?????")
    # success_url = reverse_lazy('author-list')

# class BulkDeleteView(View):
#     model = DocumentMeta

#     def post(self, request, *args, **kwargs):
#         print("post method")
#         delete_ids = request.POST['delete_ids'].split(',')  # should validate
#         delete_ids = "1,2"  # should validate
#         self.model.objects.filter(pk__in=delete_ids).delete()
#         return render / redirect