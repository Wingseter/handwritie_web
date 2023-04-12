from tensorflow.keras.utils import to_categorical
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense, Activation
import numpy as np
from numpy import argmax

(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_test = x_test.reshape(10000, 784).astype('float32') / 255.0
y_test = to_categorical(y_test)
xhat_idx = np.random.choice(x_test.shape[0], 5)
xhat = x_test[xhat_idx]

# 2. 모델 불러오기
model = load_model('mnist_model.h5')

yhat = model.predict_classes(xhat)

for i in range(5):
    print('True : ' + str(argmax(y_test[xhat_idx[i]])) + ', Predict : ' + str(yhat[i]))

import matplotlib.pyplot as plt

print(model)
test_num = plt.imread('./re3.png')
test_num = test_num[:,:,0]
test_num = (test_num > 125) * test_num
test_num = test_num.astype('float32') / 255.0
test_num = test_num.reshape((1, 784))
model.summary()
print('The Answer is ', model.predict_classes(test_num))