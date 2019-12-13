chcp 65001
git pull && npm run build && "C:\Program Files (x86)\IIS\Microsoft Web Deploy V3\msdeploy.exe" -verb:sync -source:iisApp=%cd%/dist -dest:iisApp=crm-member,wmsvc=39.105.33.251,username=crm,password=afarsoft,skipAppCreation=false -allowUntrusted=true -useChecksum -enableRule:DoNotDeleteRule  && echo 重要警告：发布成功后记得把代码提交并推送！！！！！！！！！
