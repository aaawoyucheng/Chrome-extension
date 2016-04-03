import os
try:
    from you_get.common import main
    main()
except Exception as e:
    print(e)
    os.system('pause')