import platform
import os

ext = r""

if platform.system().startswith("Win"):
    ext = r"bat"
# elif platform.system().startswith("Lin"):
    # ext = r"sh"
else:
    exit()

os.system(os.path.abspath(r"compile\\" + r"compile." + ext))

with open(os.path.abspath(r"compile\\global.js")) as f:
    with open(os.path.abspath(r"webpage\\global.js"), "w") as ff:
        ff.write(f.read())
        ff.close()
    f.close()
    os.remove(os.path.abspath(r"compile\\global.js"))
