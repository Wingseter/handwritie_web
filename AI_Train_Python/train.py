from tensorflow.keras.datasets.mnist import load_data
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical

(x_train, y_train), (x_test, y_test) = load_data(path="mnist.npz")


x_train, x_val, y_train, y_val = train_test_split(x_train, y_train, test_size = 0.3, random_state=777)

num_x_train = x_train.shape[0]
num_x_val = x_val.shape[0]
num_x_test = x_test.shape[0]

x_train = (x_train.reshape((num_x_train, 28 * 28))) /255
x_val = (x_val.reshape((num_x_val, 28*28))) / 255
x_test = (x_test.reshape((num_x_test, 28 * 28))) / 255

y_train = to_categorical(y_train)
y_val = to_categorical(y_val)
y_test = to_categorical(y_test)

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

model = Sequential()
model.add(Dense(64, activation = 'relu', input_shape=(784,)))
model.add(Dense(32, activation = 'relu'))
model.add(Dense(10, activation = 'softmax'))

model.compile(optimizer = 'adam',
    loss = 'categorical_crossentropy',
    metrics=['accuracy'])

history = model.fit(x_train, y_train,
    epochs = 30,
    batch_size = 128,
    validation_data = (x_val, y_val))

from keras.models import load_model

model.save('mnist_model.h5')
# import matplotlib.pyplot as pyplot

# plt.imshow(x_test[0].reshape(28, 28))
# plt.title('')