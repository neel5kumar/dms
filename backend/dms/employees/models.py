from django.db import models

# Create your models here.

class Department(models.Model):
   deptName=models.CharField(max_length=100)
   deptDescription=models.CharField(max_length=200)


class Employees(models.Model):
    firstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    userId = models.CharField(max_length=100, unique=True)
    emailAddress = models.CharField(max_length=100)
    domainId = models.CharField(max_length=100, blank=True)
    createdBy = models.CharField(max_length=200, blank=True)
    createdOn = models.DateTimeField(max_length=200)
    lastUpdatedBy = models.CharField(max_length=200, blank=True)
    lastUpdatedOn = models.DateTimeField(max_length=200)
    phoneNumber = models.CharField(max_length=200, blank=True)
    phoneNumber2 = models.CharField(max_length=200, blank=True)
    phoneNumber3 = models.CharField(max_length=200, blank=True)
    address = models.CharField(max_length=400, blank=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)



# class emploeeRoles(models.Model):
#    roleName=models.CharField(max_length=100)
#    roleDesc=models.CharField(max_length=200)

# class roles(models.Model):
#    roleName=models.CharField(max_length=100)
#    roleDesc=models.CharField(max_length=200)

# 
# class officationLocations(models.Model):
#    locationName=models.CharField(max_length=100)
#    address=models.CharField(max_length=200)
