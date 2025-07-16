open to separate powersell
1st set execution policy by this command
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
>>

then activate virtual environment by 
venv\Scripts\activate

now go weather and gateway directory in both powershell
and runn app.py by python app.py command




now you can hit local serve..and you will see your webpage.. http://127.0.0.1:5000/
in input box you can enter any city name ..and itwill show weather condition of that city