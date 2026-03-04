"""
IMAGE RECOGNITION WITH CONVOLUTIONAL NEURAL NETWORKS
Complete Python Implementation Guide

This file contains production-ready code for:
1. Building CNNs from scratch
2. Image classification on MNIST and CIFAR-10
3. Transfer learning with pre-trained models
4. Feature visualization
5. Real-time inference
6. Complete training pipelines
"""

import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.datasets import mnist, cifar10
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report, confusion_matrix
import time

print("="*80)
print("IMAGE RECOGNITION WITH CNN - COMPLETE IMPLEMENTATION")
print("="*80)

# =============================================================================
# 1. UNDERSTANDING IMAGE DATA
# =============================================================================

def demonstrate_image_data():
    """Show how images are represented as numerical arrays"""
    print("\n" + "="*80)
    print("1. UNDERSTANDING IMAGE DATA")
    print("="*80)
    
    # Load sample MNIST image
    (x_train, y_train), _ = mnist.load_data()
    sample_image = x_train[0]
    sample_label = y_train[0]
    
    print(f"\n📊 Image Properties:")
    print(f"   Shape: {sample_image.shape}")
    print(f"   Data type: {sample_image.dtype}")
    print(f"   Value range: [{sample_image.min()}, {sample_image.max()}]")
    print(f"   Label: {sample_label}")
    print(f"   Total pixels: {sample_image.size:,}")
    
    print(f"\n🔢 Pixel values (top-left 8x8 region):")
    print(sample_image[:8, :8])
    
    print(f"\n💾 Memory usage: {sample_image.nbytes} bytes")
    print(f"   For 60,000 images: {(x_train.nbytes / 1024**2):.2f} MB")
    
    return sample_image, sample_label


# =============================================================================
# 2. MANUAL CONVOLUTION IMPLEMENTATION
# =============================================================================

def manual_convolution():
    """Implement convolution from scratch to understand the operation"""
    print("\n" + "="*80)
    print("2. CONVOLUTION FROM SCRATCH")
    print("="*80)
    
    def convolve2d(image, kernel):
        """Apply 2D convolution"""
        img_h, img_w = image.shape
        ker_h, ker_w = kernel.shape
        
        # Calculate output dimensions
        out_h = img_h - ker_h + 1
        out_w = img_w - ker_w + 1
        
        output = np.zeros((out_h, out_w))
        
        # Perform convolution
        for i in range(out_h):
            for j in range(out_w):
                # Extract patch
                patch = image[i:i+ker_h, j:j+ker_w]
                # Element-wise multiplication and sum
                output[i, j] = np.sum(patch * kernel)
        
        return output
    
    # Create test image
    test_image = np.array([
        [0, 0, 0, 255, 255, 255],
        [0, 0, 0, 255, 255, 255],
        [0, 0, 0, 255, 255, 255],
        [0, 0, 0, 255, 255, 255],
        [0, 0, 0, 255, 255, 255],
        [0, 0, 0, 255, 255, 255]
    ], dtype=np.float32)
    
    # Different kernels
    kernels = {
        'Vertical Edge': np.array([[-1, 0, 1],
                                   [-1, 0, 1],
                                   [-1, 0, 1]]),
        'Horizontal Edge': np.array([[-1, -1, -1],
                                     [ 0,  0,  0],
                                     [ 1,  1,  1]]),
        'Sharpen': np.array([[ 0, -1,  0],
                            [-1,  5, -1],
                            [ 0, -1,  0]])
    }
    
    print(f"\n📐 Input image shape: {test_image.shape}")
    print(f"Input:\n{test_image.astype(int)}")
    
    for name, kernel in kernels.items():
        result = convolve2d(test_image, kernel)
        print(f"\n🔍 {name} Detection:")
        print(f"   Kernel:\n{kernel}")
        print(f"   Output shape: {result.shape}")
        print(f"   Output:\n{result.astype(int)}")


# =============================================================================
# 3. BUILD CNN FOR MNIST (DIGIT CLASSIFICATION)
# =============================================================================

def build_mnist_cnn():
    """Build and train CNN for MNIST digit recognition"""
    print("\n" + "="*80)
    print("3. MNIST DIGIT CLASSIFICATION WITH CNN")
    print("="*80)
    
    # Load data
    print("\n📥 Loading MNIST dataset...")
    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    
    print(f"   Training samples: {x_train.shape[0]:,}")
    print(f"   Test samples: {x_test.shape[0]:,}")
    print(f"   Image size: {x_train.shape[1]}×{x_train.shape[2]}")
    print(f"   Classes: {len(np.unique(y_train))}")
    
    # Preprocess
    x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0
    x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0
    
    y_train_cat = to_categorical(y_train, 10)
    y_test_cat = to_categorical(y_test, 10)
    
    # Build model
    print("\n🏗️  Building CNN Architecture...")
    model = models.Sequential([
        # Conv Block 1
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1), name='conv1'),
        layers.MaxPooling2D((2, 2), name='pool1'),
        
        # Conv Block 2
        layers.Conv2D(64, (3, 3), activation='relu', name='conv2'),
        layers.MaxPooling2D((2, 2), name='pool2'),
        
        # Conv Block 3
        layers.Conv2D(64, (3, 3), activation='relu', name='conv3'),
        
        # Classifier
        layers.Flatten(name='flatten'),
        layers.Dense(64, activation='relu', name='fc1'),
        layers.Dropout(0.5, name='dropout'),
        layers.Dense(10, activation='softmax', name='output')
    ], name='MNIST_CNN')
    
    # Display architecture
    print("\n" + "="*60)
    model.summary()
    print("="*60)
    
    # Compile
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Train
    print("\n🎓 Training CNN...")
    history = model.fit(
        x_train, y_train_cat,
        batch_size=128,
        epochs=5,
        validation_split=0.1,
        verbose=1
    )
    
    # Evaluate
    print("\n📊 Evaluating on Test Set...")
    test_loss, test_accuracy = model.evaluate(x_test, y_test_cat, verbose=0)
    
    print(f"\n✅ RESULTS:")
    print(f"   Test Accuracy: {test_accuracy*100:.2f}%")
    print(f"   Test Loss: {test_loss:.4f}")
    
    # Make predictions
    print("\n🔮 Sample Predictions:")
    predictions = model.predict(x_test[:10], verbose=0)
    
    for i in range(10):
        pred_class = np.argmax(predictions[i])
        true_class = y_test[i]
        confidence = predictions[i][pred_class] * 100
        
        status = "✓" if pred_class == true_class else "✗"
        print(f"   {status} Image {i+1}: True={true_class}, Pred={pred_class}, Confidence={confidence:.2f}%")
    
    return model, history


# =============================================================================
# 4. VISUALIZE LEARNED FEATURES
# =============================================================================

def visualize_cnn_features(model):
    """Visualize what the CNN has learned"""
    print("\n" + "="*80)
    print("4. VISUALIZING LEARNED FEATURES")
    print("="*80)
    
    # Get Conv1 filters
    conv1_weights = model.get_layer('conv1').get_weights()[0]
    print(f"\n🔍 Conv1 Filters:")
    print(f"   Shape: {conv1_weights.shape}")
    print(f"   Number of filters: {conv1_weights.shape[-1]}")
    print(f"   Kernel size: {conv1_weights.shape[0]}×{conv1_weights.shape[1]}")
    
    # Show filter statistics
    print(f"\n📊 Filter Statistics:")
    print(f"   Min value: {conv1_weights.min():.4f}")
    print(f"   Max value: {conv1_weights.max():.4f}")
    print(f"   Mean value: {conv1_weights.mean():.4f}")
    print(f"   Std dev: {conv1_weights.std():.4f}")
    
    # Create activation model
    layer_outputs = [layer.output for layer in model.layers[:6]]
    activation_model = keras.Model(inputs=model.input, outputs=layer_outputs)
    
    # Get sample image
    (x_test, _), _ = mnist.load_data()
    sample = x_test[0:1].reshape(-1, 28, 28, 1).astype('float32') / 255.0
    
    # Get activations
    activations = activation_model.predict(sample, verbose=0)
    
    print(f"\n📈 Layer Activations:")
    layer_names = ['conv1', 'pool1', 'conv2', 'pool2', 'conv3', 'flatten']
    for name, activation in zip(layer_names, activations):
        print(f"   {name:10s}: {activation.shape}")
        if 'conv' in name:
            n_active = np.sum(activation > 0)
            total = activation.size
            print(f"              {n_active}/{total} neurons active ({n_active/total*100:.1f}%)")


# =============================================================================
# 5. CIFAR-10 COLOR IMAGE CLASSIFICATION
# =============================================================================

def build_cifar10_cnn():
    """Build CNN for CIFAR-10 (32x32 color images)"""
    print("\n" + "="*80)
    print("5. CIFAR-10 COLOR IMAGE CLASSIFICATION")
    print("="*80)
    
    # Load CIFAR-10
    print("\n📥 Loading CIFAR-10 dataset...")
    (x_train, y_train), (x_test, y_test) = cifar10.load_data()
    
    class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer',
                   'dog', 'frog', 'horse', 'ship', 'truck']
    
    print(f"   Training samples: {x_train.shape[0]:,}")
    print(f"   Test samples: {x_test.shape[0]:,}")
    print(f"   Image size: {x_train.shape[1]}×{x_train.shape[2]}×{x_train.shape[3]}")
    print(f"   Classes: {len(class_names)}")
    print(f"   Class names: {', '.join(class_names)}")
    
    # Preprocess
    x_train = x_train.astype('float32') / 255.0
    x_test = x_test.astype('float32') / 255.0
    
    y_train_cat = to_categorical(y_train, 10)
    y_test_cat = to_categorical(y_test, 10)
    
    # Build larger model for color images
    print("\n🏗️  Building CNN for Color Images...")
    model = models.Sequential([
        # Block 1
        layers.Conv2D(32, (3, 3), activation='relu', padding='same', 
                     input_shape=(32, 32, 3)),
        layers.BatchNormalization(),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Block 2
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Block 3
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Classifier
        layers.Flatten(),
        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(10, activation='softmax')
    ], name='CIFAR10_CNN')
    
    print(f"\n📊 Model Parameters: {model.count_params():,}")
    
    # Compile
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Train (fewer epochs for demo)
    print("\n🎓 Training on CIFAR-10...")
    history = model.fit(
        x_train[:10000], y_train_cat[:10000],  # Subset for demo
        batch_size=64,
        epochs=3,
        validation_split=0.1,
        verbose=1
    )
    
    # Evaluate
    print("\n📊 Evaluating...")
    test_loss, test_accuracy = model.evaluate(
        x_test[:1000], y_test_cat[:1000], verbose=0
    )
    
    print(f"\n✅ RESULTS:")
    print(f"   Test Accuracy: {test_accuracy*100:.2f}%")
    print(f"   Test Loss: {test_loss:.4f}")
    
    # Sample predictions
    print("\n🔮 Sample Predictions:")
    predictions = model.predict(x_test[:5], verbose=0)
    
    for i in range(5):
        pred_idx = np.argmax(predictions[i])
        true_idx = y_test[i][0]
        confidence = predictions[i][pred_idx] * 100
        
        status = "✓" if pred_idx == true_idx else "✗"
        print(f"   {status} Image {i+1}: True={class_names[true_idx]:10s}, "
              f"Pred={class_names[pred_idx]:10s}, Conf={confidence:.2f}%")
    
    return model


# =============================================================================
# 6. TRANSFER LEARNING WITH PRE-TRAINED RESNET50
# =============================================================================

def transfer_learning_demo():
    """Demonstrate transfer learning with ResNet50"""
    print("\n" + "="*80)
    print("6. TRANSFER LEARNING WITH RESNET50")
    print("="*80)
    
    # Load pre-trained ResNet50
    print("\n📥 Loading pre-trained ResNet50...")
    model = ResNet50(weights='imagenet', include_top=True)
    
    print(f"   Model: ResNet50")
    print(f"   Trained on: ImageNet (1.4M images, 1000 classes)")
    print(f"   Total parameters: {model.count_params():,}")
    
    # Model structure
    print(f"\n🏗️  Architecture Overview:")
    print(f"   Input: 224×224×3 RGB image")
    print(f"   Depth: 50 layers")
    print(f"   Key innovation: Residual connections (skip connections)")
    print(f"   Output: 1000 ImageNet classes")
    
    # Create a synthetic image (random for demo)
    print("\n🔮 Making Prediction on Sample Image...")
    
    # In production, load actual image:
    # img = image.load_img('path/to/image.jpg', target_size=(224, 224))
    # x = image.img_to_array(img)
    
    # For demo, use random image
    x = np.random.rand(224, 224, 3) * 255
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    
    # Predict
    start_time = time.time()
    preds = model.predict(x, verbose=0)
    inference_time = (time.time() - start_time) * 1000
    
    # Decode predictions
    top_preds = decode_predictions(preds, top=5)[0]
    
    print(f"\n📊 Top 5 Predictions:")
    for i, (imagenet_id, label, score) in enumerate(top_preds, 1):
        print(f"   {i}. {label:25s} {score*100:6.2f}%")
    
    print(f"\n⚡ Inference time: {inference_time:.1f}ms")
    
    # Show how to fine-tune
    print("\n🔧 Fine-tuning Strategy:")
    print("   1. Freeze early layers (keep ImageNet features)")
    print("   2. Replace final classification layer")
    print("   3. Train on your dataset")
    print("   4. Optionally unfreeze later layers and train more")
    
    return model


# =============================================================================
# 7. DATA AUGMENTATION
# =============================================================================

def demonstrate_augmentation():
    """Show data augmentation techniques"""
    print("\n" + "="*80)
    print("7. DATA AUGMENTATION")
    print("="*80)
    
    from tensorflow.keras.preprocessing.image import ImageDataGenerator
    
    # Create augmentation pipeline
    datagen = ImageDataGenerator(
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        zoom_range=0.2,
        fill_mode='nearest'
    )
    
    print("\n🔄 Augmentation Techniques:")
    print("   ✓ Rotation: ±20 degrees")
    print("   ✓ Width shift: ±20%")
    print("   ✓ Height shift: ±20%")
    print("   ✓ Horizontal flip: Yes")
    print("   ✓ Zoom: ±20%")
    
    # Load sample image
    (x_train, _), _ = mnist.load_data()
    sample = x_train[0:1].reshape(-1, 28, 28, 1)
    
    print(f"\n📊 Effect on Training:")
    print(f"   Original dataset: 60,000 images")
    print(f"   With augmentation: Effectively infinite variations")
    print(f"   Benefit: Reduces overfitting, improves generalization")
    
    # Generate augmented samples
    print("\n🎨 Generating augmented samples...")
    aug_iter = datagen.flow(sample, batch_size=1)
    
    for i in range(3):
        batch = next(aug_iter)
        print(f"   Generated augmented image {i+1}: shape {batch.shape}")


# =============================================================================
# 8. MODEL EVALUATION & METRICS
# =============================================================================

def detailed_evaluation():
    """Comprehensive model evaluation"""
    print("\n" + "="*80)
    print("8. COMPREHENSIVE MODEL EVALUATION")
    print("="*80)
    
    # Load data and train simple model
    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0
    x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0
    
    # Quick model
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(10, activation='softmax')
    ])
    
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', 
                  metrics=['accuracy'])
    model.fit(x_train[:5000], y_train[:5000], epochs=3, verbose=0)
    
    # Predict
    y_pred = model.predict(x_test[:1000], verbose=0)
    y_pred_classes = np.argmax(y_pred, axis=1)
    y_true = y_test[:1000]
    
    # Classification report
    print("\n📊 Classification Report:")
    print(classification_report(y_true, y_pred_classes, 
                               target_names=[str(i) for i in range(10)]))
    
    # Confusion matrix
    cm = confusion_matrix(y_true, y_pred_classes)
    print("\n🔢 Confusion Matrix:")
    print("   Rows: True labels, Columns: Predicted labels")
    print(cm)
    
    # Per-class accuracy
    print("\n📈 Per-Class Accuracy:")
    for i in range(10):
        class_acc = cm[i, i] / cm[i, :].sum() * 100
        print(f"   Digit {i}: {class_acc:.2f}%")


# =============================================================================
# 9. PRODUCTION DEPLOYMENT TIPS
# =============================================================================

def deployment_guide():
    """Guide for deploying CNNs in production"""
    print("\n" + "="*80)
    print("9. PRODUCTION DEPLOYMENT GUIDE")
    print("="*80)
    
    print("\n🚀 Optimization Strategies:")
    print("\n1. Model Quantization:")
    print("   • Convert float32 → int8")
    print("   • 4x smaller model, 2-4x faster inference")
    print("   • Minimal accuracy loss (<1%)")
    
    print("\n2. Model Pruning:")
    print("   • Remove redundant neurons")
    print("   • 50-90% size reduction")
    print("   • Requires retraining")
    
    print("\n3. Batching:")
    print("   • Process multiple images together")
    print("   • Better GPU utilization")
    print("   • Higher throughput")
    
    print("\n4. TensorRT (NVIDIA):")
    print("   • Optimized for NVIDIA GPUs")
    print("   • 2-5x speedup")
    print("   • Production-grade")
    
    print("\n5. ONNX Format:")
    print("   • Framework-agnostic")
    print("   • Deploy across platforms")
    print("   • Hardware optimization")
    
    print("\n⚡ Typical Latencies:")
    print("   • ResNet50 on CPU: 100-300ms")
    print("   • ResNet50 on GPU: 5-15ms")
    print("   • MobileNet on mobile: 20-50ms")
    print("   • EfficientNet-B0 on GPU: 3-8ms")


# =============================================================================
# MAIN EXECUTION
# =============================================================================

if __name__ == "__main__":
    print("\n" + "="*80)
    print("RUNNING ALL DEMONSTRATIONS")
    print("="*80)
    
    # Run all demonstrations
    try:
        # 1. Image data
        demonstrate_image_data()
        
        # 2. Manual convolution
        manual_convolution()
        
        # 3. MNIST CNN
        mnist_model, mnist_history = build_mnist_cnn()
        
        # 4. Visualize features
        visualize_cnn_features(mnist_model)
        
        # 5. CIFAR-10
        cifar_model = build_cifar10_cnn()
        
        # 6. Transfer learning
        resnet_model = transfer_learning_demo()
        
        # 7. Data augmentation
        demonstrate_augmentation()
        
        # 8. Evaluation
        detailed_evaluation()
        
        # 9. Deployment
        deployment_guide()
        
        print("\n" + "="*80)
        print("✅ ALL DEMONSTRATIONS COMPLETED SUCCESSFULLY!")
        print("="*80)
        
        print("\n📝 Summary:")
        print("   ✓ Understood image representation")
        print("   ✓ Implemented convolution from scratch")
        print("   ✓ Built CNN for MNIST (99%+ accuracy possible)")
        print("   ✓ Built CNN for CIFAR-10 (color images)")
        print("   ✓ Used transfer learning with ResNet50")
        print("   ✓ Applied data augmentation")
        print("   ✓ Evaluated model with comprehensive metrics")
        print("   ✓ Learned deployment best practices")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()

print("\n" + "="*80)
print("PROGRAM COMPLETE")
print("="*80)
